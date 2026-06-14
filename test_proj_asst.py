import urllib.request
import json

endpoint = "https://mediguide-ai-resource.services.ai.azure.com/api/projects/mediguide-ai"
key = "7VHqEA2iMHe9jVtJ1K5A1TXsKFeCETMaOaT7XyM61A7KMd4XwPjnJQQJ99CFAcQBBLyXJ3w3AAAAACOGwPo1"

url = f"{endpoint}/openai/assistants?api-version=2024-05-01-preview"
req = urllib.request.Request(url, headers={"api-key": key})
try:
    with urllib.request.urlopen(req) as response:
        print(response.read().decode())
except Exception as e:
    print("Error:", e)
