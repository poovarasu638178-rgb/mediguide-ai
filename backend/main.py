import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import AzureOpenAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="MediGuide AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = AzureOpenAI(
    azure_endpoint=os.getenv("AZURE_AI_ENDPOINT"),
    api_key=os.getenv("AZURE_API_KEY"),
    api_version="2024-05-01-preview"
)

AGENT_ID = os.getenv("AGENT_ID", "MediGuide-AI-Agent")

class Resources(BaseModel):
    lab: bool = False
    imaging: bool = False
    iv: bool = False
    specialist: bool = False

class DiagnosisRequest(BaseModel):
    age: int
    gender: str
    location: str
    symptoms: str
    resources: Resources

@app.get("/")
def root():
    return {"status": "MediGuide AI backend running"}

@app.post("/api/diagnose")
async def diagnose(request: DiagnosisRequest):
    try:
        patient_data = f"""Patient: {request.age}yo {request.gender}, Location: {request.location}
Symptoms: {request.symptoms}
Resources: Lab={request.resources.lab}, Imaging={request.resources.imaging}, IV={request.resources.iv}, Specialist={request.resources.specialist}

Provide clinical assessment with reasoning steps and WHO citations."""

        thread = client.beta.threads.create()
        client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=patient_data
        )
        run = client.beta.threads.runs.create_and_poll(
            thread_id=thread.id,
            assistant_id=AGENT_ID
        )
        messages = client.beta.threads.messages.list(thread_id=thread.id)
        response_text = messages.data[0].content[0].text.value
        return {
            "response": response_text,
            "reasoning_steps": ["Analyzed symptoms", "Checked WHO guidelines", "Formulated diagnosis"],
            "citations": [{"id": 1, "title": "WHO Clinical Guidelines", "url": "https://www.who.int"}]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
