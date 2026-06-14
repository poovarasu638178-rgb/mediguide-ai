import os
from azure.ai.agents import AgentsClient
from azure.core.credentials import AzureKeyCredential

endpoint = "https://mediguide-ai-resource.services.ai.azure.com/api/projects/mediguide-ai"
key = "7VHqEA2iMHe9jVtJ1K5A1TXsKFeCETMaOaT7XyM61A7KMd4XwPjnJQQJ99CFAcQBBLyXJ3w3AAAAACOGwPo1"

client = AgentsClient(endpoint=endpoint, credential=AzureKeyCredential(key))
for agent in client.list_agents():
    print("Agent ID:", agent.id, "Name:", agent.name)
