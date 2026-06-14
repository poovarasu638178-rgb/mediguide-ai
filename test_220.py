import os
from dotenv import load_dotenv
from azure.ai.projects import AIProjectClient
from azure.core.credentials import AzureKeyCredential

load_dotenv("backend/.env")
endpoint = os.environ.get("AZURE_AI_ENDPOINT")
key = os.environ.get("AZURE_API_KEY")

client = AIProjectClient(endpoint=endpoint, credential=AzureKeyCredential(key))
print("Client initialized")
try:
    print(client.agents.threads)
except Exception as e:
    print("Agents error:", e)
