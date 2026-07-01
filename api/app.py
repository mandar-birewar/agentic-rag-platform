from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.dependencies import initialize
from api.upload import router as upload_router
from api.chat import router as chat_router

@asynccontextmanager
async def lifespan(app: FastAPI):

    print("Loading AI Components...")

    initialize()

    print("AI Components Ready!")

    yield

    print("Shutting Down...")


app = FastAPI(

    title="Production AI Agent",

    version="1.0.0",

    lifespan=lifespan

)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(chat_router)

@app.get("/")
def home():

    return {
        "message": "Production AI Agent API Running 🚀"
    }