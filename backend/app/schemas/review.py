# app/schemas/review.py

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class ReviewBase(BaseModel):
    movie_id: int
    author: str = Field(..., max_length=100)
    content: str


class ReviewCreate(BaseModel):
    movie_id: int
    author: str
    content: str


class ReviewResponse(BaseModel):
    id: int
    movie_id: int
    author: str
    content: str

    sentiment_score: int
    sentiment_source: str
    created_at: datetime

    # ⭐⭐⭐ Pydantic v2 핵심
    model_config = {"from_attributes": True}
