import re
from typing import List

import spacy
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS

SKILL_KEYWORDS = {
    "python",
    "java",
    "javascript",
    "typescript",
    "react",
    "node",
    "fastapi",
    "flask",
    "django",
    "sql",
    "postgresql",
    "mongodb",
    "redis",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "gcp",
    "git",
    "rest",
    "graphql",
    "machine learning",
    "nlp",
    "scikit-learn",
    "pandas",
    "numpy",
    "tensorflow",
    "pytorch",
    "ci/cd",
    "tailwind",
    "html",
    "css",
    "linux",
}

try:
    _NLP = spacy.load("en_core_web_sm")
except Exception:
    _NLP = spacy.blank("en")


def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    tokens = [tok for tok in text.split() if tok not in ENGLISH_STOP_WORDS and len(tok) > 2]
    return " ".join(tokens)


def extract_keywords(cleaned_text: str, top_n: int = 30) -> List[str]:
    tokens = [tok for tok in cleaned_text.split() if len(tok) > 2]
    freq = {}
    for token in tokens:
        freq[token] = freq.get(token, 0) + 1
    sorted_keywords = sorted(freq.items(), key=lambda x: x[1], reverse=True)
    return [word for word, _ in sorted_keywords[:top_n]]


def extract_skills(text: str) -> List[str]:
    lowered = text.lower()
    found = set()

    for skill in SKILL_KEYWORDS:
        if skill in lowered:
            found.add(skill)

    doc = _NLP(text)
    for token in doc:
        candidate = token.text.strip().lower()
        if candidate in SKILL_KEYWORDS:
            found.add(candidate)

    return sorted(found)
