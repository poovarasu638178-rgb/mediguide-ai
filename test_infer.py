import os
from dotenv import load_dotenv
from azure.ai.inference import ChatCompletionsClient
from azure.core.credentials import AzureKeyCredential

load_dotenv("backend/.env")
client = ChatCompletionsClient(
    endpoint=os.environ.get("AZURE_AI_ENDPOINT"),
    credential=AzureKeyCredential(os.environ.get("AZURE_API_KEY"))
)
try:
    res = client.complete(
        messages=[{"role":"user", "content":"hello"}],
        model=os.environ.get("AGENT_ID")
    )
    print("Success:", res)
except Exception as e:
    print("Error:", e)
