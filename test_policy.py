import os
import time
from dotenv import load_dotenv
from azure.ai.projects import AIProjectClient
from azure.core.credentials import AccessToken
from azure.core.pipeline.policies import HTTPPolicy

load_dotenv("backend/.env")

class FakeTokenCredential:
    def __init__(self, key):
        self.key = key
    def get_token(self, *scopes, **kwargs):
        return AccessToken(self.key, int(time.time()) + 3600)

class ApiKeyPolicy(HTTPPolicy):
    def send(self, request):
        auth = request.http_request.headers.get("Authorization")
        if auth and auth.startswith("Bearer "):
            key = auth[len("Bearer "):]
            request.http_request.headers["api-key"] = key
            del request.http_request.headers["Authorization"]
        return self.next.send(request)

endpoint = os.environ.get("AZURE_AI_ENDPOINT")
key = os.environ.get("AZURE_API_KEY")

client = AIProjectClient(endpoint=endpoint, credential=FakeTokenCredential(key), policies=[ApiKeyPolicy()])
try:
    print(client.agents.threads.create())
except Exception as e:
    print("Error:", e)
