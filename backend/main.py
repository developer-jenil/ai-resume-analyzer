from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.analyze import router as analyze_router


app = FastAPI(
    title="AI Resume Analyzer API",
    version="1.0.0",
    description="Analyze resume and job description similarity with NLP insights.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router, prefix="/api")


@app.get("/")
async def health_check():
    return {"status": "ok", "service": "AI Resume Analyzer API"}
