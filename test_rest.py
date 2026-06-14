import requests

endpoint = "https://mediguide-ai-resource.services.ai.azure.com/api/projects/mediguide-ai"
key = "7VHqEA2iMHe9jVtJ1K5A1TXsKFeCETMaOaT7XyM61A7KMd4XwPjnJQQJ99CFAcQBBLyXJ3w3AAAAACOGwPo1"

url = f"{endpoint}/agents/v1.0/threads?api-version=2024-05-01-preview"
headers = {"api-key": key, "Content-Type": "application/json"}
try:
    res = requests.post(url, headers=headers, json={})
    print("Status:", res.status_code)
    print("Response:", res.text)
except Exception as e:
    print("Error:", e)
