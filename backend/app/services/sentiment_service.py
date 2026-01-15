import requests
from app.core.config import settings

# from app.utils.sentiment_rule import rule_based_sentiment

HF_URL = f"https://api-inference.huggingface.co/models/{settings.HF_MODEL_ID}"

HEADERS = {"Authorization": f"Bearer {settings.HF_API_KEY}"}


def hf_sentiment(text: str) -> int:
    response = requests.post(HF_URL, headers=HEADERS, json={"inputs": text}, timeout=10)
    response.raise_for_status()

    result = response.json()[0]
    label = result["label"]  # e.g. "4 stars"
    score = int(label[0])  # 1~5
    return score


def analyze_sentiment(text: str) -> dict:
    try:
        score = hf_sentiment(text)
        source = "huggingface"
    except Exception:
        score = rule_based_sentiment(text)
        source = "rule-based"

    return {"score": score, "source": source}
