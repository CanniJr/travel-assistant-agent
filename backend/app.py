from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from dotenv import load_dotenv

load_dotenv()  # Loads variables from .env

app = FastAPI()

app.add_middleware(CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # From frontend development server using vite
    # allow_origins=["*"],  # Uncomment to allow all origins (testing only)
    # allow_origins=["http://localhost:5173", "http://your-production-domain.com"],  # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
VLLM_URL = os.getenv("VLLM_URL") 

@app.post("/chat")
async def chat_endpoint(request: Request):
    body = await request.json()
    print("Debug log: ", body)  
    async with httpx.AsyncClient() as client:
        response = await client.post(VLLM_URL, json=body)
        return response.json()