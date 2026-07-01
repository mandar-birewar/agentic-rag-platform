class PromptBuilder : 
    """
    Builds a grounded prompt for the LLM using
    retrieved context from the Vector Database.
    """
    
    def __init__(self) : 
        self.system_prompt = """
You are a helpful AI Assistant.

Answer ONLY from the provided context.

If the answer is not present inside the context,
reply exactly:

"I couldn't find that information in the uploaded document."

Do not make up facts.
Do not use outside knowledge.
Always stay grounded in the provided context.
"""

    def build(
        self,
        query: str,
        context: list[str]
    ) -> str:

        context_text = "\n\n".join(context)

        prompt = f"""
{self.system_prompt}

========================
CONTEXT
========================

{context_text}

========================
QUESTION
========================

{query}

========================
ANSWER
========================
"""

        return prompt