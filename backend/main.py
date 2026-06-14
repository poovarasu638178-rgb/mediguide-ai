import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from dotenv import load_dotenv

from openai import AzureOpenAI

load_dotenv()

app = FastAPI(title="MediGuide AI API")

# Setup CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
AZURE_AI_ENDPOINT = os.environ.get("AZURE_AI_ENDPOINT", "").rstrip("/")
AZURE_API_KEY     = os.environ.get("AZURE_API_KEY")
AGENT_ID          = os.environ.get("AGENT_ID", "MediGuide-AI-Agent")

# Initialize AzureOpenAI client (works with Azure AI Foundry endpoints)
client = None
if AZURE_AI_ENDPOINT and AZURE_API_KEY:
    client = AzureOpenAI(
        api_key=AZURE_API_KEY,
        api_version="2024-05-01-preview",
        azure_endpoint=AZURE_AI_ENDPOINT
    )

@app.post("/api/diagnose")
async def diagnose(request: DiagnosisRequest):
    if not client:
        raise HTTPException(
            status_code=500,
            detail="Azure OpenAI client not configured. Missing AZURE_AI_ENDPOINT or AZURE_API_KEY."
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

Please analyze this case and return the response strictly as a JSON object with these exact keys:
- "isEmergency" (boolean)
- "diagnosis" (string)
- "confidence" (string, e.g., "94%")
- "reasoning" (array of strings)
- "treatments" (array of strings)
- "citations" (array of objects with "id" and "title" string properties)
"""

        # 2. Create a thread
        thread = client.beta.threads.create()

        # 3. Add user message to thread
        client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=patient_data
        )

        # 4. Run the MediGuide-AI-Agent and wait for completion
        run = client.beta.threads.runs.create_and_poll(
            thread_id=thread.id,
            assistant_id=AGENT_ID
        )

        if run.status == "completed":
            # 5. Retrieve the agent's response
            messages = client.beta.threads.messages.list(thread_id=thread.id)

            # The newest message is first (descending order by default)
            latest_message = messages.data[0]

            if latest_message.role == "assistant":
                content = latest_message.content[0].text.value

                # Strip markdown codeblocks if the agent includes them
                cleaned = content.replace("```json", "").replace("```", "").strip()

                try:
                    return json.loads(cleaned)
                except json.JSONDecodeError:
                    return {
                        "isEmergency": False,
                        "diagnosis": "Error parsing agent response.",
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
        "agent_configured": client is not None,
        "agent_id": AGENT_ID
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
