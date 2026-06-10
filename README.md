<h1 align="center">
  <br/>
  🏥 MediGuide AI
  <br/>
</h1>

<p align="center">
  <b>AI-Powered Clinical Decision Support for Resource-Limited Settings</b><br/>
  <sub>Microsoft Agents League Hackathon 2026 Submission</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Built%20with-Azure%20AI%20Foundry-0078D4?style=for-the-badge&logo=microsoft-azure" />
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi" />
  <img src="https://img.shields.io/badge/AI-GPT--4o-412991?style=for-the-badge&logo=openai" />
</p>

<p align="center">
  <a href="https://literate-space-giggle-g4vq4v4xp7xrfp74r-8000.app.github.dev/health"><strong>🔗 Live API (Health Check)</strong></a>
  &nbsp;·&nbsp;
  <a href="#-quick-start"><strong>🚀 Setup</strong></a>
  &nbsp;·&nbsp;
  <a href="#-architecture"><strong>🏗 Architecture</strong></a>
</p>

---

## 📌 Problem Statement

**Over 3.5 billion people** live in regions with limited access to specialist healthcare. Clinicians in rural clinics, field hospitals, and low-resource settings routinely make high-stakes diagnostic decisions without access to up-to-date clinical guidelines, specialist consultation, or advanced diagnostics.

The result: **preventable misdiagnoses, delayed treatments, and avoidable patient deaths** — not due to lack of skill, but lack of access to knowledge.

---

## 💡 Solution — MediGuide AI

MediGuide AI is an **AI-powered clinical decision support system** that puts the reasoning capacity of a specialist panel in the hands of any frontline healthcare worker — regardless of location or available resources.

A clinician enters a patient's demographics, symptoms, and what equipment is available at their facility. MediGuide AI:

1. **Reasons** through the case using a multi-step agent chain
2. **Cross-references** global clinical guidelines (WHO, CDC, AHA) via Retrieval-Augmented Generation
3. **Returns** a structured differential diagnosis, step-by-step reasoning, and evidence-based treatment protocol — all adapted to the available resources

> **No internet-dependent specialist. No expensive equipment. Just evidence-based guidance at the point of care.**

---

## ⚡ Azure AI Foundry Agent Integration

MediGuide AI is built on the **Microsoft Azure AI Foundry** platform, using the `azure-ai-projects` SDK to orchestrate a purpose-built clinical reasoning agent.

### How the Agent Works

```
User Input (Patient Case)
        │
        ▼
┌───────────────────────────────┐
│   FastAPI Backend             │
│  ┌─────────────────────────┐  │
│  │  AIProjectClient        │  │
│  │  (azure-ai-projects)    │  │
│  │                         │  │
│  │  1. create_thread()     │  │
│  │  2. create_message()    │  │
│  │  3. create_and_        │  │
│  │     process_run()       │  │
│  │  4. list_messages()     │  │
│  └─────────────────────────┘  │
└───────────────────────────────┘
        │
        ▼
┌───────────────────────────────┐
│   Azure AI Foundry Agent      │
│   Model: GPT-4o               │
│   Tools:                      │
│   • Azure Cognitive Search    │
│     (clinical guideline RAG)  │
│   • Structured JSON output    │
└───────────────────────────────┘
        │
        ▼
Structured Response:
  • diagnosis
  • reasoning steps
  • treatment protocol
  • evidence citations
```

### Agent Capabilities

| Capability | Implementation |
|---|---|
| Multi-step reasoning | Agent thread with `create_and_process_run` |
| RAG over clinical guidelines | Azure Cognitive Search index (`clinical-guidelines-index`) |
| Structured output | JSON-formatted response with schema enforcement |
| Resource-aware planning | Patient resources passed as context to agent |
| Citation grounding | Citations sourced from Azure Search results |

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18 + Vite** | UI framework and build tool |
| **Vanilla CSS** | Custom design system, dark theme |
| **Google Fonts (Inter)** | Typography |
| **GitHub Codespaces** | Live hosted dev environment |

### Backend
| Technology | Purpose |
|---|---|
| **FastAPI** | REST API server (`/api/diagnose`, `/health`) |
| **Uvicorn** | ASGI server |
| **azure-ai-projects** | Azure AI Foundry agent orchestration |
| **python-dotenv** | Environment configuration |
| **Pydantic** | Request/response schema validation |

### AI & Cloud
| Technology | Purpose |
|---|---|
| **Azure AI Foundry** | Agent hosting, thread management, runs |
| **Azure OpenAI GPT-4o** | Core reasoning model |
| **Azure Cognitive Search** | RAG retrieval of clinical guidelines |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│                   React + Vite (SPA)                         │
│                                                              │
│  ┌──────────────────┐        ┌──────────────────────────┐   │
│  │  Patient Form    │        │     Results Panel         │   │
│  │  • Demographics  │──────▶│  • Clinical Assessment    │   │
│  │  • Symptoms      │  POST  │  • Reasoning Steps        │   │
│  │  • Resources     │        │  • Evidence Citations     │   │
│  └──────────────────┘        └──────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS (Codespaces)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        BACKEND                               │
│                   FastAPI + Python                           │
│                                                              │
│  POST /api/diagnose                                          │
│  GET  /health                                                │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │            Azure AI Foundry SDK                     │     │
│  │  AIProjectClient → Thread → Message → Run          │     │
│  └────────────────────────────────────────────────────┘     │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   AZURE AI FOUNDRY                           │
│                                                              │
│   Agent: MediGuide-AI-Agent (GPT-4o)                        │
│   ┌──────────────────┐   ┌────────────────────────────┐     │
│   │  Reasoning Chain │   │  Azure Cognitive Search    │     │
│   │  (Thread/Runs)   │◀─▶│  clinical-guidelines-index │     │
│   └──────────────────┘   └────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
mediguide-ai/
├── backend/
│   ├── main.py            # FastAPI app, /api/diagnose endpoint
│   ├── agent.py           # Agent processing logic
│   └── requirements.txt   # Python dependencies
├── frontend/
│   ├── src/
│   │   └── App.jsx        # Full React SPA (form + results UI)
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .env.example           # Environment variable template
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- An **Azure AI Foundry** project with a deployed agent
- Azure Cognitive Search service (optional, for RAG)

### 1. Clone the Repository

```bash
git clone https://github.com/poovarasu638178-rgb/mediguide-ai.git
cd mediguide-ai
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your Azure credentials:

```env
AZURE_AI_ENDPOINT=https://your-foundry-project.api.azureml.ms
AZURE_API_KEY=your_azure_api_key_here
AGENT_ID=your-foundry-agent-id

# Azure Cognitive Search (for RAG citations)
AZURE_SEARCH_ENDPOINT=https://your-search-service.search.windows.net
AZURE_SEARCH_KEY=your_azure_search_key_here
AZURE_SEARCH_INDEX=clinical-guidelines-index
```

### 3. Start the Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Verify the backend is running:
```bash
curl http://localhost:8000/health
# → {"status":"ok","agent_configured":true,"agent_id":"..."}
```

### 4. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| **Backend API** | `https://literate-space-giggle-g4vq4v4xp7xrfp74r-8000.app.github.dev` |
| **Health Check** | [`/health`](https://literate-space-giggle-g4vq4v4xp7xrfp74r-8000.app.github.dev/health) |
| **Diagnose Endpoint** | `POST /api/diagnose` |

> **Note:** The Codespaces backend must be running and port 8000 set to **Public** for the live demo to be accessible.

### Sample API Request

```bash
curl -X POST https://literate-space-giggle-g4vq4v4xp7xrfp74r-8000.app.github.dev/api/diagnose \
  -H "Content-Type: application/json" \
  -d '{
    "age": 34,
    "gender": "female",
    "location": "Rural Clinic, Tamil Nadu",
    "symptoms": "Fever for 3 days, cough, mild breathlessness, no chest pain",
    "resources": {
      "lab": true,
      "imaging": false,
      "iv": true,
      "specialist": false
    }
  }'
```

### Sample API Response

```json
{
  "response": "Based on the clinical presentation...",
  "reasoning_steps": [
    "Analyzed primary symptoms: fever, cough, breathlessness",
    "Checked for red flags: chest pain absent, SpO2 not reported",
    "Queried WHO clinical guidelines via Azure Cognitive Search",
    "Formulated differential: CAP vs viral URTI vs early TB"
  ],
  "citations": [
    {
      "id": "WHO-ARI-2024",
      "title": "WHO Acute Respiratory Infection Management Guidelines",
      "url": "https://www.who.int/publications/clinical-guidelines"
    }
  ]
}
```

---

## 🎯 Key Features

- ✅ **Resource-aware diagnosis** — treatment plans adapt to what's available at the facility
- ✅ **Multi-step agent reasoning** — transparent chain-of-thought visible to the clinician
- ✅ **RAG-grounded citations** — every recommendation backed by WHO/CDC/AHA guidelines
- ✅ **Emergency flagging** — critical cases surfaced with priority alerts
- ✅ **Zero-dependency UI** — pure React, works on low-bandwidth connections
- ✅ **CORS-enabled API** — ready for any frontend origin

---

## 👨‍💻 About the Builder

| | |
|---|---|
| **Name** | Poovarasu S |
| **Institution** | Knowledge Institute of Technology (KIOT), Salem, Tamil Nadu |
| **Hackathon** | Microsoft Agents League Hackathon 2026 |
| **GitHub** | [@poovarasu638178-rgb](https://github.com/poovarasu638178-rgb) |

---

## 📄 License

This project was built for the **Microsoft Agents League Hackathon 2026** and is intended for demonstration and educational purposes.

---

<p align="center">
  Built with ❤️ using <strong>Azure AI Foundry</strong> · <strong>Microsoft Agents League Hackathon 2026</strong>
</p>
