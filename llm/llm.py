from google import genai
from config import GEMINI_API_KEY

class LLM :
    def __init__(self):
        self.client = genai.Client(
            api_key=GEMINI_API_KEY
        )
        
        self.model = "gemini-2.5-flash"
        
    def chat(self, prompt: str) :
        try:
            response = self.client.models.generate_content(
                model = self.model,
                contents=prompt
            )   
        except Exception as e:
            return f"LLM Error : {e}"
                 
        
        return response.text