# app/core/database.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.core.config import settings

# ======================
# Engine
# ======================
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
)

# ======================
# Session
# ======================
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


# ======================
# Base
# ======================
class Base(DeclarativeBase):
    pass


# ======================
# Dependency
# ======================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
