class QueryRouter:

    """
    Decides whether a query
    should use RAG or normal chat.
    """

    def route(
        self,
        query: str
    ):

        prompt = f"""
You are an AI Router.

Return ONLY one word.

RAG

or

CHAT

Question:

{query}
"""

        return prompt