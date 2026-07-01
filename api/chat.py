from fastapi import APIRouter
from pydantic import BaseModel

from api.dependencies import get_agent


router = APIRouter()


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str


@router.post(
    "/chat",
    response_model=ChatResponse
)
def chat(request: ChatRequest):

    agent = get_agent()
    print("Agent ID:", id(agent))
    print("Memory Size:", len(agent.memory.get_messages()))   

    answer = agent.run(
        request.message
    )

    return ChatResponse(
        response=answer
    )
    
 