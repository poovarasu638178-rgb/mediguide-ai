# MediGuide AI

**MediGuide AI** is a global clinical decision support agent built for the Microsoft Agents League Hackathon 2026. It provides doctors with AI-powered diagnostic suggestions, transparent multi-step clinical reasoning, and citations backed by WHO and CDC guidelines.

## Tech Stack

- **Frontend**: React (Vite/CRA), Tailwind CSS
- **Backend**: FastAPI (Python), Uvicorn
- **AI Agent**: Azure OpenAI (GPT-4o), Azure Cognitive Search (for RAG)

## Project Structure

- `/frontend`: React application containing the chat interface, reasoning visualizations, and citation cards.
- `/backend`: FastAPI application exposing the `/api/diagnose` endpoint and containing the Azure OpenAI agent logic.

## Setup Instructions

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables:
   Copy `.env.example` to `.env` and fill in your Azure API keys.
5. Run the FastAPI server:
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`.

### 2. Frontend Setup
*(Assuming a standard Vite/Create React App setup around the provided `src` files)*
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (e.g., React, TailwindCSS):
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Features

- **Chat Interface**: Doctors can input patient symptoms in natural language.
- **Transparent Reasoning**: The AI visualizes its step-by-step clinical reasoning process.
- **Evidence-Based Citations**: Recommendations are backed by specific WHO/CDC guidelines retrieved via Azure Search.

## Hackathon Goal

To demonstrate how advanced AI agents can assist medical professionals globally by providing fast, reliable, and transparent clinical decision support.
