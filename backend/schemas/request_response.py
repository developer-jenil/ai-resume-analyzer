from typing import List, Optional

from pydantic import BaseModel, Field


class UploadResponse(BaseModel):
    resumeId: str
    extractedText: str
    preview: str


class AnalyzeRequest(BaseModel):
    resumeId: Optional[str] = None
    resumeText: Optional[str] = None
    jobDescription: str = Field(..., min_length=20)


class AnalyzeResponse(BaseModel):
    matchScore: float
    matchedSkills: List[str]
    missingSkills: List[str]
    keywordOverlap: List[str]
    suggestions: List[str]
    weakAreas: List[str]
    scoreBreakdown: dict
    timestamp: Optional[str] = None
