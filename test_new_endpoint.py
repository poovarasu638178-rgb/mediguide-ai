import os
from azure.ai.projects import AIProjectClient
from azure.core.credentials import AzureKeyCredential

endpoint = "https://mediguide-ai-resource.services.ai.azure.com/api/projects/mediguide-ai"
key = "7VHqEA2iMHe9jVtJ1K5A1TXsKFeCETMaOaT7XyM61A7KMd4XwPjnJQQJ99CFAcQBBLyXJ3w3AAAAACOGwPo1"

try:
    client = AIProjectClient(endpoint=endpoint, credential=AzureKeyCredential(key))
    print(client.beta.agents)
except Exception as e:
    print("Error:", e)
