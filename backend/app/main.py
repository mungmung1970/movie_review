from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import movies, reviews, sentiment

app = FastAPI(title=settings.APP_NAME)

# ✅ CORS는 반드시 router보다 먼저
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ 그 다음 router
app.include_router(movies.router, prefix="/movies", tags=["Movies"])
app.include_router(reviews.router, prefix="/reviews", tags=["Reviews"])
app.include_router(sentiment.router, prefix="/sentiment", tags=["Sentiment"])
