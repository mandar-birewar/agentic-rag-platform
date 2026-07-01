from rag.rag_pipeline import RAGPipeline


class RAGManager:

    def __init__(self):

        self.pipeline = RAGPipeline()

        self.is_indexed = False

    def ingest(self, pdf_path: str):

        self.pipeline.ingest(pdf_path)

        self.is_indexed = True

    def search(self, query: str):

        if not self.is_indexed:
            return "No document has been uploaded yet."

        return self.pipeline.retrieve(
            query=query,
            top_k=3
        )


# Global Singleton
rag_manager = RAGManager()