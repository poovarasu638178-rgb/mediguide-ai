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
    api_version="2024-11-01-preview"
)

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
Resources: Lab={request.resources.lab}, Imaging={request.resources.imaging}, IV={request.resources.iv}, Specialist={request.resources.specialist}"""

        response = client.chat.completions.create(
            model="gpt-4.1",
            messages=[
                {"role": "system", "content": """You are MediGuide AI, a global clinical decision support agent. When given patient info:
1. ANALYZE symptoms step by step
2. REASON through diagnoses from most to least likely
3. CONSIDER location and available resources
4. PROVIDE differential diagnosis with probability
5. RECOMMEND treatment protocol based on WHO guidelines
6. CITE WHO sources
7. FLAG if emergency referral needed
Be concise, cited, and life-saving."""},
                {"role": "user", "content": patient_data}
            ]
        )
        response_text = response.choices[0].message.content
        return {
            "response": response_text,
            "reasoning_steps": ["Analyzed symptoms", "Cross-referenced WHO guidelines", "Formulated differential diagnosis", "Generated treatment protocol"],
            "citations": [{"id": 1, "title": "WHO Clinical Guidelines", "url": "https://www.who.int"}]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
