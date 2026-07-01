from typing import Dict, List, Optional

from tools.base_tool import BaseTool


class ToolRegistry:
    """
    Stores and manages all tools available to the AI Agent.
    """

    def __init__(self):
        self.tools: Dict[str, BaseTool] = {}

    def register(self, tool: BaseTool) -> None:
        """
        Register a new tool.
        """

        if tool.name in self.tools:
            raise ValueError(
                f"Tool '{tool.name}' is already registered."
            )

        self.tools[tool.name] = tool

    def unregister(self, name: str) -> None:
        """
        Remove a tool.
        """

        if name in self.tools:
            del self.tools[name]

    def get_tool(self, name: str) -> Optional[BaseTool]:
        """
        Return a tool by name.
        """

        return self.tools.get(name)

    def list_tools(self) -> List[BaseTool]:
        """
        Return all registered tools.
        """

        return list(self.tools.values())

    def get_schemas(self) -> List[dict]:
        """
        Return schemas of every registered tool.
        """

        return [

            tool.get_schema()

            for tool in self.tools.values()

        ]