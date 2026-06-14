import os
import json
from dotenv import load_dotenv
import urllib.request

load_dotenv("backend/.env")

endpoint = os.environ.get("AZURE_AI_ENDPOINT")
key = os.environ.get("AZURE_API_KEY")

url = f"{endpoint}/openai/assistants?api-version=2024-05-01-preview"
req = urllib.request.Request(url, headers={"api-key": key})
try:
    with urllib.request.urlopen(req) as response:
        print(response.read().decode())
except Exception as e:
    print("Error:", e)
