# app/core/config.py

from pydantic import BaseModel
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # ======================
    # App
    # ======================
    APP_NAME: str = "Movie Review API"
    ENV: str = "local"

    # ======================
    # Database (Supabase)
    # ======================
    DATABASE_URL: str

    # ======================
    # Hugging Face Inference
    # ======================
    HF_API_KEY: str
    HF_MODEL_ID: str = "nlptown/bert-base-multilingual-uncased-sentiment"

    # ======================
    # CORS
    # ======================
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
    ]

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
