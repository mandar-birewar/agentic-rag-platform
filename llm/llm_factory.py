from llm.gemini_llm import GeminiLLM

class LLMFactory:
    @staticmethod
    def create():
        return GeminiLLM()
    
    
    