import uuid
from datetime import datetime
from typing import Dict, List

from fastapi import APIRouter, File, HTTPException, UploadFile

from schemas.request_response import AnalyzeRequest, AnalyzeResponse, UploadResponse
from services.analyzer import analyze_resume_and_jd
from utils.pdf_parser import extract_text_from_pdf

router = APIRouter(tags=["analyzer"])

_resume_store: Dict[str, str] = {}
_analysis_history: List[dict] = []


@router.post("/upload-resume", response_model=UploadResponse)
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    try:
        file_bytes = await file.read()
        extracted_text = extract_text_from_pdf(file_bytes)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Failed to parse PDF: {exc}") from exc

    if not extracted_text.strip():
        raise HTTPException(status_code=400, detail="No readable text found in the PDF.")

    resume_id = str(uuid.uuid4())
    _resume_store[resume_id] = extracted_text

    return UploadResponse(
        resumeId=resume_id,
        extractedText=extracted_text,
        preview=extracted_text[:1000],
    )


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(payload: AnalyzeRequest):
    resume_text = payload.resumeText

    if payload.resumeId and payload.resumeId in _resume_store:
        resume_text = _resume_store[payload.resumeId]

    if not resume_text or not resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text is required.")

    if not payload.jobDescription or not payload.jobDescription.strip():
        raise HTTPException(status_code=400, detail="Job description is required.")

    result = analyze_resume_and_jd(resume_text, payload.jobDescription)
    result.timestamp = datetime.utcnow().isoformat()
    _analysis_history.append(result.model_dump())

    return result


@router.get("/results")
async def get_results():
    return {"count": len(_analysis_history), "results": _analysis_history[-20:]}
