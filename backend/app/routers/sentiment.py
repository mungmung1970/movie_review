# app/routers/sentiment.py

from fastapi import APIRouter
from pydantic import BaseModel

from app.services.sentiment_service import analyze_sentiment

router = APIRouter()


class SentimentRequest(BaseModel):
    text: str


class SentimentResponse(BaseModel):
    score: int
    source: str


@router.post("/analyze", response_model=SentimentResponse)
def analyze_text_sentiment(request: SentimentRequest):
    return analyze_sentiment(request.text)
