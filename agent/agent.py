from llm.llm_factory import LLMFactory
from tools.calculator import calculator
from tools.time_tool import current_time
from tools.weather import get_weather
from tools import ALL_TOOLS
from memory.conversation import ConversationMemory

class Agent:

    def __init__(self):
        self.llm = LLMFactory.create()
        self.memory = ConversationMemory()

    def run(self, query: str):

        self.memory.add_user_message(query)
        print(self.memory.get_messages())

        response = self.llm.chat(
            messages=self.memory.get_messages(),
            tools=ALL_TOOLS
        )
        print("\nLLM Response:")
        print(response)

        self.memory.add_assistant_message(response)

        return response

    def chat(self, query: str):
        return self.run(query)
    