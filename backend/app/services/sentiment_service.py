import requests
from app.core.config import settings


# =========================
# Rule-based fallback
# =========================
def rule_based_sentiment(text: str) -> int:
    """
    매우 단순한 규칙 기반 감성 분석
    1~5 점수 반환 (중립=3)
    """
    positive_keywords = ["좋다", "재밌", "훌륭", "최고", "감동"]
    negative_keywords = ["별로", "지루", "최악", "실망", "나쁘"]

    score = 3  # 기본 중립

    for word in positive_keywords:
        if word in text:
            score += 1

    for word in negative_keywords:
        if word in text:
            score -= 1

    # DB CHECK 제약 보호
    return max(1, min(5, score))


# =========================
# Main sentiment function
# =========================
def analyze_sentiment(text: str) -> dict:
    """
    HuggingFace → 실패 시 rule-based fallback
    """
    if settings.HF_API_KEY and settings.HF_MODEL_ID:
        try:
            response = requests.post(
                f"https://api-inference.huggingface.co/models/{settings.HF_MODEL_ID}",
                headers={
                    "Authorization": f"Bearer {settings.HF_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={"inputs": text},
                timeout=10,
            )
            response.raise_for_status()

            result = response.json()
            label = result[0]["label"]
            score = result[0]["score"]

            return {
                "score": 5 if label == "POSITIVE" else 1,
                "source": "huggingface",
            }

        except Exception:
            pass  # fallback으로 내려감

    # ⭐ 여기서 rule-based 사용
    return {
        "score": rule_based_sentiment(text),
        "source": "rule-based",
    }
