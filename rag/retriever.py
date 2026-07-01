from rag.embeddings import Embeddings
from rag.vector_store import VectorStore

class Retriever :
    def __init__(
        self,
        embedding_model: Embeddings,
        vector_store: VectorStore
    ):
        self.embedding_model = embedding_model
        self.vector_store =  vector_store
        
    def retrieve(
        self,
        query: str,
        top_k : int = 3
    ) :
        
        query_embedding = self.embedding_model.embed_query(
            query
        )
        
        results = self.vector_store.search(
            query_embedding= query_embedding,
            top_k = top_k            
        )
        
        return results
        