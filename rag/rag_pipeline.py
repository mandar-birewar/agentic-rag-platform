from rag.loader import PDFLoader
from rag.splitter import TextSplitter
from rag.embeddings import Embeddings
from rag.vector_store import VectorStore
from rag.retriever import Retriever
from rag.prompt_builder import PromptBuilder

from llm.llm_factory import LLMFactory


class RAGPipeline:

    def __init__(self):

        self.loader = PDFLoader()

        self.splitter = TextSplitter()

        self.embedding_model = Embeddings()

        self.vector_store = VectorStore()

        self.retriever = Retriever(
            self.embedding_model,
            self.vector_store
        )

        self.prompt_builder = PromptBuilder()

        self.llm = LLMFactory.create()

    def ingest(
        self,
        pdf_path: str
    ):

        text = self.loader.load(pdf_path)

        chunks = self.splitter.split(text)

        embeddings = self.embedding_model.embed_documents(
            chunks
        )

        self.vector_store.add_documents(
            chunks,
            embeddings
        )

        print("✅ PDF Indexed Successfully!")

    def ask(
        self,
        query: str
    ):

        context = self.retriever.retrieve(
            query=query,
            top_k=3
        )

        prompt = self.prompt_builder.build(
            query=query,
            context=context
        )

        answer = self.llm.chat(
            prompt
        )

        return answer