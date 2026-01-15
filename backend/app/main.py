# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import movies, reviews, sentiment

app = FastAPI(title=settings.APP_NAME)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router 등록
app.include_router(movies.router, prefix="/movies", tags=["Movies"])
app.include_router(reviews.router, prefix="/reviews", tags=["Reviews"])
app.include_router(sentiment.router, prefix="/sentiment", tags=["Sentiment"])
