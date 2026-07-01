from rag.manager import rag_manager


def search_document(question: str) -> str:
    """
    Search the uploaded document.

    Use this tool whenever the user asks about
    resumes, PDFs, reports, uploaded files,
    notes or documents.
    """

    results = rag_manager.search(question)

    if isinstance(results, str):
        return results

    return "\n\n".join(results)