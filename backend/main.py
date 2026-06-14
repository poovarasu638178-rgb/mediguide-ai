import os
import json
import time
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from dotenv import load_dotenv

from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

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

class PatientData(BaseModel):
    age: int
    gender: str
    location: str
    symptoms: str
    resources: dict

# Initialize Azure AI Project Client
AZURE_AI_ENDPOINT = os.environ.get("AZURE_AI_ENDPOINT")
if not AZURE_AI_ENDPOINT:
    print("WARNING: AZURE_AI_ENDPOINT is not set.")

try:
    project_client = AIProjectClient(
        endpoint=AZURE_AI_ENDPOINT,
        credential=DefaultAzureCredential()
    )
except Exception as e:
    print(f"Failed to initialize AIProjectClient: {e}")
    project_client = None

AGENT_ID = os.environ.get("AGENT_ID", "MediGuide-AI-Agent")

@app.post("/api/diagnose")
async def diagnose(patient: PatientData):
    if not project_client:
        raise HTTPException(
            status_code=500, 
            detail="Azure AI Client failed to initialize. Check Azure AD Credentials."
        )

    try:
        # Format the patient data
        patient_data = (
            f"Patient Context:\n"
            f"- Age: {patient.age}\n"
            f"- Gender: {patient.gender}\n"
            f"- Location: {patient.location}\n"
            f"- Resources: {patient.resources}\n\n"
            f"Symptoms/Query: {patient.symptoms}\n\n"
            f"Please analyze this case and return the response strictly as a JSON object matching the MediGuide UI format with these exact keys:\n"
            f"- 'isEmergency' (boolean)\n"
            f"- 'diagnosis' (string)\n"
            f"- 'confidence' (string, e.g., '94%')\n"
            f"- 'reasoning' (array of strings)\n"
            f"- 'treatments' (array of strings)\n"
            f"- 'citations' (array of objects with 'id' and 'title' string properties)\n"
        )

        # 1. Create a thread
        thread = project_client.agents.create_thread()

        # 2. Create a message
        project_client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=patient_data
        )

        # 3. Create and process run
        run = project_client.agents.create_and_process_run(
            thread_id=thread.id,
            assistant_id=AGENT_ID
        )

        if run.status == "completed":
            # 4. List messages
            messages = project_client.agents.list_messages(thread_id=thread.id)
            
            # The newest message is at index 0
            latest_message = messages.data[0]
            
            if latest_message.role == "assistant":
                content = latest_message.content[0].text.value
                
                # Strip markdown codeblocks
                cleaned_content = content.replace("```json", "").replace("```", "").strip()
                
                try:
                    # Parse the JSON and return it
                    return json.loads(cleaned_content)
                except json.JSONDecodeError:
                    return {
                        "isEmergency": False,
                        "diagnosis": "Error parsing agent response as JSON. Raw output: " + content[:200],
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
        print(f"Error during diagnosis: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {
        "status": "ok", 
        "agent_configured": project_client is not None,
        "agent_id": AGENT_ID
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
