from dotenv import load_dotenv
import os
load_dotenv()  # Load environment variables from .env file

CHUNK_SIZE = 500
CHUNK_OVERLAP = 100

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY is None:
    raise ValueError("GEMINI API KEY not found in .env file.")
