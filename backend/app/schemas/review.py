# app/schemas/review.py

from pydantic import BaseModel, Field
from datetime import datetime


class ReviewBase(BaseModel):
    movie_id: int
    author: str = Field(..., max_length=100)
    content: str


class ReviewCreate(ReviewBase):
    pass


class ReviewResponse(ReviewBase):
    id: int
    sentiment_score: int = Field(..., ge=1, le=5)
    sentiment_source: str
    created_at: datetime

    class Config:
        from_attributes = True
