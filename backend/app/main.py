from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import movies, reviews, sentiment

app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,  # ⭐ list 타입이어야 함
    allow_credentials=False,  # ⭐ True면 preflight 깨짐
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(movies.router, prefix="/movies", tags=["Movies"])
app.include_router(reviews.router, prefix="/reviews", tags=["Reviews"])
app.include_router(sentiment.router, prefix="/sentiment", tags=["Sentiment"])
