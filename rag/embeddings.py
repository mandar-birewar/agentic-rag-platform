from sentence_transformers import SentenceTransformer

class Embeddings :
    def __init__(self):
        print("Loading Embedding Model...")
        
        self.model = SentenceTransformer(
            "BAAI/bge-small-en-v1.5"
        )
        
        print("Embedding model loaded....")
        
    def embed_documents(self, documents):
        return self.model.encode(
            documents,
            normalize_embeddings = True
        ).tolist()
     
    def embed_query(self, query) :
        return self.model.encode(
            query,
            normalize_embeddings = True
        ).tolist()         