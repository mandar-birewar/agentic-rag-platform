# AI-Agent Platform

A production-grade, resume-worthy AI Agent Platform built from scratch in Python — capable of multi-tool orchestration, conversation memory, RAG, and multi-agent workflows.

---

## Architecture Overview

```
User Query
    │
    ▼
┌─────────────────────────────────────────┐
│              FastAPI Layer              │  ← api/
│    POST /chat  │  GET /health  etc.     │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│              AI Agent Core              │  ← agent/
│  • Decides if a tool is needed          │
│  • Selects the right tool               │
│  • Assembles final response             │
└──────┬──────────────┬───────────────────┘
       │              │
       ▼              ▼
┌────────────┐  ┌───────────────────────┐
│ LLM Module │  │     Tool Registry     │  ← tools/
│ (Gemini /  │  │  WeatherTool          │
│  OpenAI)   │  │  NewsTool             │
└────────────┘  │  CalculatorTool       │
                │  TimeTool             │
                │  DocumentTool (RAG)   │
                └───────────────────────┘
                         │
                         ▼
              ┌────────────────────┐
              │   Memory Module    │  ← memory/
              │  Conversation ctx  │
              └────────────────────┘
                         │
                         ▼
              ┌────────────────────┐
              │  Vector DB (RAG)   │  ← ChromaDB
              │  PDF → Chunks →    │
              │  Embeddings →      │
              │  Retriever         │
              └────────────────────┘
```

---

## Project Structure

```
AI-Agent/
├── main.py                # Entry point
├── config.py              # Centralized settings (reads .env)
├── requirements.txt       # All dependencies
├── .env.example           # Template — copy to .env
├── README.md
│
├── agent/                 # Core agent logic
│   ├── __init__.py
│   ├── base_agent.py      # (Cell 8) Manual keyword agent
│   └── ai_agent.py        # (Cell 9) LLM-driven agent
│
├── llm/                   # LLM abstraction layer
│   ├── __init__.py
│   └── llm_wrapper.py     # (Cell 1) Unified Gemini/OpenAI interface
│
├── tools/                 # Tool implementations
│   ├── __init__.py
│   ├── base_tool.py       # (Cell 2) Abstract Tool interface
│   ├── weather_tool.py    # (Cell 3)
│   ├── news_tool.py       # (Cell 4)
│   ├── calculator_tool.py # (Cell 5)
│   ├── time_tool.py       # (Cell 6)
│   ├── tool_registry.py   # (Cell 7)
│   └── document_tool.py   # (Cell 18) RAG tool
│
├── prompts/               # Externalized prompt templates
│   ├── __init__.py
│   └── system_prompt.txt  # (Cell 12)
│
├── memory/                # Conversation memory
│   ├── __init__.py
│   └── conversation_memory.py  # (Cell 11)
│
├── api/                   # FastAPI routes
│   ├── __init__.py
│   ├── routes.py          # (Cell 14)
│   └── schemas.py         # Request/Response Pydantic models
│
├── utils/                 # Shared utilities
│   ├── __init__.py
│   └── logger.py          # (Cell 13)
│
├── logs/                  # Runtime log files (git-ignored)
│   └── agent.log
│
├── tests/                 # Test suite
│   ├── __init__.py
│   ├── test_cell0.py
│   └── ...
│
└── frontend/              # React UI (Cell 16)
```

---

## Quick Start

```bash
# 1. Clone the repo
git clone <repo-url>
cd AI-Agent

# 2. Create virtual environment
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure environment
cp .env.example .env
# Fill in API keys in .env

# 5. Run the app
python main.py

# 6. Start the API server (Cell 14+)
uvicorn api.routes:app --reload --host 0.0.0.0 --port 8000
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | Python 3.11+ |
| LLM | Google Gemini 1.5 / OpenAI GPT-4o |
| Agent Framework | LangGraph (Cell 9+) |
| API | FastAPI + Uvicorn |
| Vector DB | ChromaDB |
| Embeddings | sentence-transformers |
| Memory | In-memory + Redis (optional) |
| Containerization | Docker + Docker Compose |
| Frontend | React + Tailwind |
| Testing | pytest |

---

## Cells (Build Milestones)

| Cell | Feature | Status |
|------|---------|--------|
| 0 | Project Setup | ✅ Done |
| 1 | LLM Wrapper | ⬜ |
| 2 | Tool Interface | ⬜ |
| 3 | Weather Tool | ⬜ |
| 4 | News Tool | ⬜ |
| 5 | Calculator Tool | ⬜ |
| 6 | Time Tool | ⬜ |
| 7 | Tool Registry | ⬜ |
| 8 | Manual Agent | ⬜ |
| 9 | AI Agent (LLM Routing) | ⬜ |
| 10 | Multi-Tool Calls | ⬜ |
| 11 | Memory | ⬜ |
| 12 | Prompt Management | ⬜ |
| 13 | Logging | ⬜ |
| 14 | FastAPI Backend | ⬜ |
| 15 | Streaming | ⬜ |
| 16 | React Frontend | ⬜ |
| 17 | Vector DB / RAG | ⬜ |
| 18 | Document Tool | ⬜ |
| 19 | Reflection | ⬜ |
| 20 | Planning Agent | ⬜ |
| 21 | Multi-Agent System | ⬜ |
| 22 | Docker | ⬜ |
| 23 | Deployment | ⬜ |
| 24 | Evaluation | ⬜ |
| 25 | Final Polish | ⬜ |

---

## API Keys Needed

| Service | Used For | Free Tier |
|---------|----------|-----------|
| [Google AI Studio](https://aistudio.google.com) | Gemini LLM | ✅ Yes |
| [OpenWeatherMap](https://openweathermap.org/api) | Weather Tool | ✅ Yes |
| [NewsAPI](https://newsapi.org) | News Tool | ✅ Yes |
| [OpenAI](https://platform.openai.com) | Optional fallback LLM | ⚠️ Paid |
