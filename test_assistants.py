import os
from dotenv import load_dotenv
from openai import AzureOpenAI

load_dotenv("backend/.env")

client = AzureOpenAI(
    api_key=os.environ.get("AZURE_API_KEY"),
    api_version="2024-05-01-preview",
    azure_endpoint=os.environ.get("AZURE_AI_ENDPOINT")
)

try:
    assistants = client.beta.assistants.list()
    for a in assistants.data:
        print(f"Name: {a.name}, ID: {a.id}")
except Exception as e:
    print(f"Error: {e}")
