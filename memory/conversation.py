from google.genai import types


class ConversationMemory:

    def __init__(self):
        self.messages = []

    def add_user_message(self, text: str):

        self.messages.append(
            types.Content(
                role="user",
                parts=[
                    types.Part.from_text(text=text)
                ]
            )
        )

    def add_assistant_message(self, text: str):

        self.messages.append(
            types.Content(
                role="model",
                parts=[
                    types.Part.from_text(text=text)
                ]
            )
        )

    def get_messages(self):
        return self.messages

    def clear(self):
        self.messages.clear()