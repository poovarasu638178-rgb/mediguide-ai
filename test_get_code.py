import os
from azure.ai.projects import AIProjectClient
from azure.core.credentials import AzureKeyCredential

endpoint = "https://mediguide-ai-resource.services.ai.azure.com/api/projects/mediguide-ai"
key = "7VHqEA2iMHe9jVtJ1K5A1TXsKFeCETMaOaT7XyM61A7KMd4XwPjnJQQJ99CFAcQBBLyXJ3w3AAAAACOGwPo1"

try:
    project_client = AIProjectClient(
        endpoint=endpoint,
        credential=AzureKeyCredential(key)
    )
    openai_client = project_client.get_openai_client()
    
    response = openai_client.responses.create(
        input=[{"role": "user", "content": "Tell me what you can help with."}],
        extra_body={"agent_reference": {"name": "MediGuide-AI-Agent", "version": "4", "type": "agent_reference"}},
    )
    print("Success:", response.output_text)
except Exception as e:
    print("Error:", e)
