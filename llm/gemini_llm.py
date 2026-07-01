from google import genai
from google.genai import types

from config import GEMINI_API_KEY
from llm.base_llm import BaseLLM


class GeminiLLM(BaseLLM):

    def __init__(self):
        self.client = genai.Client(
            api_key=GEMINI_API_KEY
        )

        self.model = "gemini-2.5-flash"

    def chat(self, messages, tools=None):

        # -------------------------------
        # Support simple string prompts
        # -------------------------------

        if isinstance(messages, str):

            messages = [
                types.Content(
                    role="user",
                    parts=[
                        types.Part.from_text(
                            text=messages
                        )
                    ]
                )
            ]

        config = types.GenerateContentConfig(
            system_instruction="""
        You are Production AI Agent.

        You are participating in an ongoing conversation.

        The `contents` parameter contains the complete conversation history in chronological order.

        Always answer using the previous conversation whenever relevant.

        If the required information exists in the history, never claim that you don't remember it.

        When appropriate, use the available tools to answer the user's request.

        If a tool is not required, answer directly.

        Be concise, accurate, and truthful.
        """
        )

        if tools:
            config.tools = tools

        print("\n========== MESSAGES SENT TO GEMINI ==========\n")

        for i, message in enumerate(messages):

            print(f"\n----- Message {i+1} -----")

            print("Role :", message.role)

            for part in message.parts:
                print("Text :", repr(part.text))

        print("\n=============================================\n")

        response = self.client.models.generate_content(
            model=self.model,
            contents=messages,
            config=config
        )

        return response.text
    
