import os
from dotenv import load_dotenv
load_dotenv("backend/.env")

from openai import AzureOpenAI

AZURE_AI_ENDPOINT = os.environ.get("AZURE_AI_ENDPOINT")
AZURE_API_KEY = os.environ.get("AZURE_API_KEY")

client = AzureOpenAI(
    api_key=AZURE_API_KEY,  
    api_version="2024-02-15-preview",
    azure_endpoint=AZURE_AI_ENDPOINT
)

try:
    response = client.chat.completions.create(
        model="MediGuide-AI-Agent", # This is the deployment name in Azure
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Hello"}
        ]
    )
    print("Success:", response.choices[0].message.content)
except Exception as e:
    print("Error:", type(e), e)
