import chromadb 

class VectorStore:
    def __init__(self):
        self.client = chromadb.Client()
        
        self.collection = self.client.get_or_create_collection(
            name = "documents"
        )
    
    def add_documents(
        self,
        chunks,
        embeddings
    ) :
        ids = [
            str(i)
            for i in range(len(chunks))
        ]
        
        self.collection.add(
            ids = ids,
            documents= chunks,
            embeddings = embeddings
        )
        
    def search(
        self,
        query_embedding,
        top_k = 3
    ) :
        results = self.collection.query(
            query_embeddings= [query_embedding],
            n_results = top_k 
        )
        
        return results["documents"][0]
        
        
            