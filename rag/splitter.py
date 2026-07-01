from langchain_text_splitters import RecursiveCharacterTextSplitter
from config import CHUNK_SIZE,CHUNK_OVERLAP

class TextSplitter:

    def __init__(
        self,
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP
    ):

        self.splitter = RecursiveCharacterTextSplitter(

            chunk_size=chunk_size,

            chunk_overlap=chunk_overlap,

            separators=[

                "\n\n",

                "\n",

                ". ",

                "! ",

                "? ",

                ";",

                ",",

                " ",

                ""

            ]
        )

    def split(self, text: str):

        return self.splitter.split_text(text)