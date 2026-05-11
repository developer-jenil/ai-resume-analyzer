from typing import List, Set

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from backend.schemas.request_response import AnalyzeResponse
from backend.utils.text_processing import clean_text, extract_keywords, extract_skills


def _to_set(items: List[str]) -> Set[str]:
    return {item.strip().lower() for item in items if item and item.strip()}


def analyze_resume_and_jd(resume_text: str, job_description: str) -> AnalyzeResponse:
    cleaned_resume = clean_text(resume_text)
    cleaned_jd = clean_text(job_description)

    vectorizer = TfidfVectorizer(ngram_range=(1, 2), max_features=4000)
    tfidf_matrix = vectorizer.fit_transform([cleaned_resume, cleaned_jd])
    similarity = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])[0][0]
    match_score = round(float(similarity) * 100, 2)

    resume_skills = _to_set(extract_skills(resume_text))
    jd_skills = _to_set(extract_skills(job_description))
    matched_skills = sorted(resume_skills.intersection(jd_skills))
    missing_skills = sorted(jd_skills.difference(resume_skills))

    resume_keywords = _to_set(extract_keywords(cleaned_resume))
    jd_keywords = _to_set(extract_keywords(cleaned_jd))
    keyword_overlap = sorted(resume_keywords.intersection(jd_keywords))

    weak_areas = []
    if match_score < 55:
        weak_areas.append("Overall relevance to job description is low.")
    if len(missing_skills) > 0:
        weak_areas.append("Several role-critical skills are missing from the resume.")
    if len(keyword_overlap) < 8:
        weak_areas.append("Keyword overlap is limited. ATS alignment can be improved.")

    suggestions = []
    if missing_skills:
        suggestions.append(
            f"Add role-specific skills where truthful and evidenced: {', '.join(missing_skills[:8])}."
        )
    suggestions.append("Quantify impact with metrics (%, revenue, latency, scale).")
    suggestions.append("Tailor summary and project bullets to mirror the job language.")
    suggestions.append("Use action verbs and highlight tools/frameworks near relevant experience.")

    score_breakdown = {
        "semanticSimilarity": round(match_score * 0.7, 2),
        "skillsAlignment": round(
            (len(matched_skills) / (len(jd_skills) or 1)) * 100, 2
        ),
        "keywordCoverage": round(
            (len(keyword_overlap) / (len(jd_keywords) or 1)) * 100, 2
        ),
    }

    return AnalyzeResponse(
        matchScore=match_score,
        matchedSkills=matched_skills,
        missingSkills=missing_skills,
        keywordOverlap=keyword_overlap,
        suggestions=suggestions,
        weakAreas=weak_areas,
        scoreBreakdown=score_breakdown,
    )
