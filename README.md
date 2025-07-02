# 🧳 Travel Assistant Agent

A full-stack agentic AI travel assistant that combines a React frontend, FastAPI backend, and LLM inference engine (future). Will support real-time travel queries and multi-step agent workflows.

---

## 🚀 Tech Stack

| Layer             | Technology                     |
| ----------------- | ------------------------------ |
| 🎨 Frontend       | React (Vite) + Tailwind CSS v4 |
| 🧠 Backend        | FastAPI (Python)               |
| 🤖 Inference      | vLLM (Currently TinyLlama)     |
| 🧭 Agent Logic    | SGLang (coming soon)           |
| ⚙️ Infrastructure | Docker, Docker Compose, EC2    |
| ☸️ Orchestration  | Kubernetes (Phase 2+)          |

---

## ✨ Current Features

- Prompt-based travel assistant UI
- FastAPI backend receives prompt and returns placeholder response
- Tailwind interface with Vite

---

## 🧩 Coming Soon

### ✅ Next Milestones

- [ ] Dockerized backend & frontend setup
- [ ] vLLM integration to replace placeholder
- [ ] Agent workflow skeleton using SGLang

### 🧪 Later Phases

- [ ] Add OpenWeather, flight or maps plugin agents
- [ ] Kubernetes deployment manifests
- [ ] Memory and history persistence (e.g., Redis, Dynamo)

---

## 📦 Installation (Local Dev)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
```

### Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```bash
VLLM_URL=http://<your-ec2-ip>:8001/v1/chat/completions
```

---

## 🧠 Example Prompts

- "Find me a weekend trip in Spain under $300."
- "What’s the weather in Tokyo next Friday?"
- "Suggest 3 tropical destinations in July."

---

## 👨‍💻 Author

Built and maintained by [@CanniJr](https://github.com/CanniJr)

---

## 🔖 Tags

`React` `Tailwind CSS` `FastAPI` `LLM` `vLLM` `SGLang` `Kubernetes` `Agentic AI`

---

> This is part of an AI Infra & Inference learning roadmap focused on deploying real-time agentic applications with modern tooling.
