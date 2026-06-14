import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from dotenv import load_dotenv

from azure.ai.projects import AIProjectClient
from azure.core.credentials import AzureKeyCredential

load_dotenv()

app = FastAPI(title="MediGuide AI API")

# Setup CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models matching the frontend's expected data structure
class Resources(BaseModel):
    lab: bool
    imaging: bool
    iv: bool
    specialist: bool

class DiagnosisRequest(BaseModel):
    age: str | int
    gender: str
    location: str
    symptoms: str
    resources: Resources

# Load Environment Variables
AZURE_AI_ENDPOINT = os.environ.get("AZURE_AI_ENDPOINT")
AZURE_API_KEY = os.environ.get("AZURE_API_KEY")
AGENT_ID = os.environ.get("AGENT_ID", "MediGuide-AI-Agent")

# Initialize Azure AI Project Client
project_client = None
if AZURE_AI_ENDPOINT and AZURE_API_KEY:
    project_client = AIProjectClient(
        endpoint=AZURE_AI_ENDPOINT,
        credential=AzureKeyCredential(AZURE_API_KEY)
    )

@app.post("/api/diagnose")
async def diagnose(request: DiagnosisRequest):
    if not project_client:
        raise HTTPException(
            status_code=500, 
            detail="Azure AI Project Client is not configured. Missing AZURE_AI_ENDPOINT or AZURE_API_KEY."
        )

    try:
        # 1. Format the patient data
        patient_data = f"""
Patient Profile:
- Age: {request.age}
- Gender: {request.gender}
- Location: {request.location}

Symptoms:
{request.symptoms}

Available Resources:
- Lab: {request.resources.lab}
- Imaging: {request.resources.imaging}
- IV Access: {request.resources.iv}
- Specialist: {request.resources.specialist}

Please analyze this case and return the response strictly as a JSON object matching the MediGuide UI format with these exact keys:
- "isEmergency" (boolean)
- "diagnosis" (string)
- "confidence" (string, e.g., "94%")
- "reasoning" (array of strings)
- "treatments" (array of strings)
- "citations" (array of objects with "id" and "title" string properties)
"""

        # 2. Get the OpenAI client from the project client
        agent_client = project_client.get_openai_client(api_key=AZURE_API_KEY)
        
        # 3. Create a thread
        thread = agent_client.beta.threads.create()

        # 4. Create a message
        agent_client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=patient_data
        )

        # 5. Run the MediGuide-AI-Agent
        run = agent_client.beta.threads.runs.create_and_poll(
            thread_id=thread.id,
            assistant_id=AGENT_ID
        )

        if run.status == "completed":
            # 6. Retrieve the agent's response
            messages = agent_client.beta.threads.messages.list(thread_id=thread.id)
            
            # The newest message is at index 0 (descending order by default)
            latest_message = messages.data[0]
            
            if latest_message.role == "assistant":
                content = latest_message.content[0].text.value
                
                # Strip markdown codeblocks if the agent includes them
                cleaned_content = content.replace("```json", "").replace("```", "").strip()
                
                try:
                    # Parse the JSON and return it
                    json_response = json.loads(cleaned_content)
                    return json_response
                except json.JSONDecodeError:
                    # Fallback if agent doesn't return perfect JSON
                    return {
                        "isEmergency": False,
                        "diagnosis": "Error parsing agent response. Non-JSON returned.",
                        "confidence": "N/A",
                        "reasoning": [content],
                        "treatments": [],
                        "citations": []
                    }
            else:
                raise HTTPException(status_code=500, detail="No assistant response found in thread.")
        else:
            raise HTTPException(status_code=500, detail=f"Agent run failed with status: {run.status}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {
        "status": "ok", 
        "agent_configured": project_client is not None,
        "agent_id": AGENT_ID
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
