import os
import shutil

from fastapi import APIRouter, UploadFile, File

from api.dependencies import get_rag
router = APIRouter()


UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


@router.post("/upload")

async def upload_pdf(

    file: UploadFile = File(...)

):

    if not file.filename.endswith(".pdf"):

        return {
            "error": "Only PDF files are allowed."
        }

    file_path = os.path.join(

        UPLOAD_FOLDER,

        file.filename

    )

    with open(

        file_path,

        "wb"

    ) as buffer:

        shutil.copyfileobj(

            file.file,

            buffer

        )

    rag = get_rag()
    rag.ingest(file_path)

    return {

        "message": "PDF uploaded successfully.",

        "filename": file.filename

    }