import os
import requests
from dotenv import load_dotenv

load_dotenv("backend/.env")
endpoint = os.environ.get("AZURE_AI_ENDPOINT")
api_key = os.environ.get("AZURE_API_KEY")

url = f"{endpoint}/openai/deployments?api-version=2024-05-01-preview"
headers = {"api-key": api_key}
res = requests.get(url, headers=headers)
print(res.json())
