from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from agent import process_symptoms

app = FastAPI(title="MediGuide AI API")

# Setup CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DiagnosisRequest(BaseModel):
    symptoms: str
    patient_history: str | None = None

class Citation(BaseModel):
    id: int
    title: str
    url: str
    snippet: str

class DiagnosisResponse(BaseModel):
    response: str
    reasoning_steps: list[str]
    citations: list[Citation]

@app.post("/api/diagnose", response_model=DiagnosisResponse)
async def diagnose(request: DiagnosisRequest):
    try:
        # Call the agent to process the symptoms
        result = await process_symptoms(request.symptoms, request.patient_history)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
