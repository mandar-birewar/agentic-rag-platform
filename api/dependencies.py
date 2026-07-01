from rag.manager import RAGManager
from agent.agent import Agent


rag_manager = None
agent = None


def initialize():

    global rag_manager
    global agent

    rag_manager = RAGManager()

    agent = Agent()

    print("✅ Dependencies Initialized")


def get_rag():

    return rag_manager


def get_agent():

    return agent