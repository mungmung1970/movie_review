# app/schemas/review.py

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class ReviewBase(BaseModel):
    movie_id: int
    author: str = Field(..., max_length=100)
    content: str


class ReviewCreate(ReviewBase):
    pass


class ReviewResponse(BaseModel):
    id: int
    movie_id: int
    author: str
    content: str

    sentiment_score: int  # NOT NULL
    sentiment_source: str  # NOT NULL
    created_at: datetime

    class Config:
        from_attributes = True
