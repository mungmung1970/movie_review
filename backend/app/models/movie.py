# app/models/movie.py

from datetime import datetime
from sqlalchemy import String, Date, Text, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.core.database import Base


class Movie(Base):
    __tablename__ = "movies"  # ✅ DB 테이블명과 정확히 일치

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    release_date: Mapped[Date | None] = mapped_column(
        Date,
        nullable=True,
    )

    director: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    genre: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    poster_url: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
