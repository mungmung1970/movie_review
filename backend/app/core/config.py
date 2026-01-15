from pydantic_settings import BaseSettings
from pydantic import field_validator
from typing import List
import json


class Settings(BaseSettings):
    APP_NAME: str = "Movie Review API"
    ENV: str = "prod"
    DATABASE_URL: str

    # ⭐ 반드시 list[str]
    CORS_ORIGINS: List[str] = []

    HF_API_KEY: str | None = None
    HF_MODEL_ID: str | None = None

    class Config:
        env_file = ".env"

    # ⭐ 핵심: 문자열 → JSON 파싱
    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            return json.loads(v)
        return v


settings = Settings()
