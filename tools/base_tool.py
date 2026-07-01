from abc import ABC, abstractmethod
from typing import Any, Dict


class BaseTool(ABC):
    """
    Base class for every tool that can be used by the AI Agent.
    """

    def __init__(
        self,
        name: str,
        description: str,
        parameters: Dict[str, Any]
    ):
        self.name = name
        self.description = description
        self.parameters = parameters

    @abstractmethod
    def execute(self, **kwargs) -> Any:
        """
        Execute the tool.
        """
        pass

    def get_schema(self) -> Dict[str, Any]:
        """
        Returns a generic schema describing this tool.
        Every provider (Gemini/OpenAI/etc.) can convert this
        schema into its own function declaration format.
        """

        return {
            "name": self.name,
            "description": self.description,
            "parameters": self.parameters
        }