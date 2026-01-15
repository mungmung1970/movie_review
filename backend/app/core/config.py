from pydantic_settings import BaseSettings
from typing import List
import json


class Settings(BaseSettings):
    APP_NAME: str = "Movie Review API"
    ENV: str = "local"

    DATABASE_URL: str

    # CORS
    CORS_ORIGINS: List[str] = []

    # ✅ OpenAI
    OPENAI_API_KEY: str | None = None

    # (선택) HuggingFace 구조 유지용
    HF_API_KEY: str | None = None
    HF_MODEL_ID: str | None = None

    class Config:
        env_file = ".env"

    @classmethod
    def model_validate(cls, data):
        if "CORS_ORIGINS" in data and isinstance(data["CORS_ORIGINS"], str):
            data["CORS_ORIGINS"] = json.loads(data["CORS_ORIGINS"])
        return super().model_validate(data)


settings = Settings()
