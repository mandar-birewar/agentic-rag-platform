from abc import ABC, abstractmethod

# ABC :- Abstract Base Class

class BaseLLM(ABC):
    
    @abstractmethod
    def chat(self, prompt: str):
        """
        Every LLM provider must implement this method.   
        """
        pass
    
    
    