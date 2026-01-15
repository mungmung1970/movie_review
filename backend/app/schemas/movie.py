# app/schemas/movie.py

from pydantic import BaseModel, Field
from datetime import date, datetime


class MovieBase(BaseModel):
    title: str = Field(..., max_length=255)
    release_date: date | None = None
    director: str | None = None
    genre: str | None = None
    poster_url: str | None = None


class MovieCreate(MovieBase):
    pass


class MovieResponse(MovieBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
