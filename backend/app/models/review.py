# app/models/review.py

from datetime import datetime

from sqlalchemy import (
    Integer,
    String,
    Text,
    ForeignKey,
    DateTime,
)
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.core.database import Base


class Review(Base):
    __tablename__ = "reviews"  # Supabase 테이블명과 반드시 일치

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
        comment="리뷰 ID",
    )

    movie_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("movies.id"),
        nullable=False,
        index=True,
        comment="영화 ID",
    )

    author: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        comment="작성자",
    )

    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
        comment="리뷰 내용",
    )

    sentiment_score: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        comment="감성 점수 (1~5)",
    )

    sentiment_source: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        comment="감성 분석 출처",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
        comment="등록 시각",
    )
