import os
from azure.ai.projects import AIProjectClient

endpoint = "https://mediguide-ai-resource.services.ai.azure.com/api/projects/mediguide-ai"
key = "7VHqEA2iMHe9jVtJ1K5A1TXsKFeCETMaOaT7XyM61A7KMd4XwPjnJQQJ99CFAcQBBLyXJ3w3AAAAACOGwPo1"

# We use a dummy string for credential because we will override api_key later, 
# wait, AIProjectClient constructor requires a TokenCredential object.
# I can pass a dummy class that implements get_token, but it won't be called!
class DummyCredential:
    def get_token(self, *scopes, **kwargs):
        raise Exception("Should not be called!")

try:
    project_client = AIProjectClient(
        endpoint=endpoint,
        credential=DummyCredential()
    )
    
    openai_client = project_client.get_openai_client(api_key=key)
    
    response = openai_client.responses.create(
        input=[{"role": "user", "content": "Tell me what you can help with."}],
        extra_body={"agent_reference": {"name": "MediGuide-AI-Agent", "version": "4", "type": "agent_reference"}},
    )
    print("Success:", response.output_text)
except Exception as e:
    print("Error:", e)
