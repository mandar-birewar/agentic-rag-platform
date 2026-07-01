from llm.llm_factory import LLMFactory

llm = LLMFactory.create()

print(llm.chat("Hello"))

