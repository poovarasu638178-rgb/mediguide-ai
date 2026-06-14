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
    response = client.chat.completions.create(
        model=os.environ.get("AGENT_ID"),
        messages=[{"role": "user", "content": "Hello"}],
        max_tokens=10
    )
    print("Chat completions works!")
    print(response.choices[0].message.content)
except Exception as e:
    print(f"Error: {e}")
