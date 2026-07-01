# 🤖 Prodigy AI

<div align="center">

### Production-Ready Agentic AI Platform with RAG, Tool Calling & Conversation Memory

*Built using React, FastAPI, Gemini 2.5 Flash, ChromaDB, and a modular Agent Architecture.*

![Python](https://img.shields.io/badge/Python-3.13-blue?style=for-the-badge\&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Framework-009688?style=for-the-badge\&logo=fastapi)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge\&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?style=for-the-badge\&logo=tailwind-css)
![Gemini](https://img.shields.io/badge/Google-Gemini_2.5_Flash-4285F4?style=for-the-badge\&logo=google)
![ChromaDB](https://img.shields.io/badge/Vector-Database-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

# 📖 Overview

**Prodigy AI** is a production-style **Agentic AI Platform** that combines modern Large Language Models with Retrieval-Augmented Generation (RAG), conversation memory, intelligent tool calling, and a modern React frontend.

Unlike a basic chatbot, the application can:

* 💬 Maintain conversation context
* 📄 Chat with uploaded PDF documents
* 🧠 Retrieve relevant information using ChromaDB
* 🛠 Call external tools dynamically
* ⚡ Deliver a modern AI SaaS experience through a responsive React interface

The project is designed with modularity in mind, making it easy to swap LLM providers, extend tools, or deploy to production.

---

# ✨ Features

## 🤖 AI Agent

* Modular Agent Architecture
* Conversation Memory
* Multi-turn Conversations
* Context-Aware Responses
* System Prompt Support

---

## 📚 Retrieval-Augmented Generation (RAG)

* PDF Upload
* Automatic Chunking
* Embedding Generation
* ChromaDB Vector Database
* Semantic Search
* Context Injection into LLM

---

## 🛠 Intelligent Tool Calling

Current tools include:

* 🧮 Calculator
* 🌦 Weather
* 📰 Latest News
* 🕒 Current Time

The AI automatically decides when to invoke a tool before responding.

---

## 💻 Modern Frontend

* React + Vite
* Tailwind CSS
* shadcn/ui
* Framer Motion Animations
* Responsive Design
* Markdown Rendering
* Syntax Highlighting
* Upload Modal
* Toast Notifications
* Conversation History

---

## ⚙ Backend

* FastAPI
* REST APIs
* Modular Architecture
* Dependency Injection
* Environment Variable Configuration

---

# 🏗 System Architecture

```text
                     React + Vite Frontend
                               │
                               ▼
                         Axios API Client
                               │
                               ▼
                       FastAPI REST Backend
                               │
                               ▼
                          Agent Controller
                               │
        ┌──────────────────────┼──────────────────────┐
        ▼                      ▼                      ▼
 Conversation Memory      Tool Calling          RAG Manager
        │                      │                      │
        ▼                      ▼                      ▼
 Gemini 2.5 Flash      Weather / News /       ChromaDB Vector
                       Calculator / Time         Database
```

---

# 🛠 Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* shadcn/ui
* Framer Motion
* Axios
* React Markdown
* Lucide React

## Backend

* Python
* FastAPI
* Uvicorn
* Google Gemini API
* ChromaDB
* Sentence Transformers
* PyPDF
* python-dotenv

---

# 📂 Project Structure

```text
Production_AI_Agent/

├── agent/
│   ├── agent.py
│   └── router.py
│
├── api/
│   ├── app.py
│   ├── chat.py
│   ├── upload.py
│   └── dependencies.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── llm/
├── memory/
├── rag/
├── tools/
├── uploads/
├── chroma_db/
├── requirements.txt
└── README.md
```

---

# 📡 API Endpoints

## Chat

```http
POST /chat
```

Request

```json
{
  "message": "Explain Retrieval-Augmented Generation"
}
```

---

## Upload PDF

```http
POST /upload
```

Content-Type

```text
multipart/form-data
```

Field

```text
file
```

---

## Health Check

```http
GET /health
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/mandar-birewar/agentic-rag-platform.git

cd agentic-rag-platform
```

---

## Backend Setup

```bash
python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Run FastAPI

```bash
uvicorn api.app:app --reload
```

Backend

```
http://127.0.0.1:8000
```

Swagger Docs

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend

```
http://localhost:5173
```

---

# 🔮 Roadmap

* Streaming Responses
* Multi-LLM Support (Gemini, Groq, OpenRouter)
* Authentication
* Persistent Chat Sessions
* Docker Deployment
* Cloud Deployment
* Source Citations for RAG
* Voice Interaction
* Chat Export
* Conversation Search

---

# 📸 Screenshots

> Screenshots will be added after deployment.

---

# 🌐 Live Demo

> Coming Soon

---

# 👨‍💻 Author

**Mandar Birewar**

* GitHub: https://github.com/mandar-birewar
* LinkedIn: *(Add your LinkedIn profile here)*

---

# 📄 License

This project is licensed under the MIT License.
