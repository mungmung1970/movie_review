from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.review import Review
from app.schemas.review import ReviewCreate, ReviewResponse
from app.services.sentiment_service import analyze_sentiment

router = APIRouter()


@router.post("/", response_model=ReviewResponse)
def create_review(
    review: ReviewCreate,
    db: Session = Depends(get_db),
):
    # 1️⃣ 감성 분석 (예외 안전)
    try:
        sentiment = analyze_sentiment(review.content)
    except Exception:
        sentiment = {"score": 3, "source": "rule-based"}

    # 2️⃣ ⭐ DB CHECK 제약을 통과하도록 값 보정 (핵심)
    score = sentiment.get("score", 3)
    source = sentiment.get("source", "rule-based")

    score = max(1, min(5, int(score)))
    if source not in ("huggingface", "rule-based"):
        source = "rule-based"

    # 3️⃣ DB INSERT
    db_review = Review(
        movie_id=review.movie_id,
        author=review.author,
        content=review.content,
        sentiment_score=score,
        sentiment_source=source,
    )

    # 4️⃣ commit 실패 대비 rollback
    try:
        db.add(db_review)
        db.commit()
        db.refresh(db_review)
    except Exception:
        db.rollback()
        raise

    return db_review


@router.get("/", response_model=list[ReviewResponse])
def get_reviews(db: Session = Depends(get_db)):
    return db.query(Review).order_by(Review.created_at.desc()).all()


@router.get("/movie/{movie_id}", response_model=list[ReviewResponse])
def get_reviews_by_movie(
    movie_id: int,
    db: Session = Depends(get_db),
):
    return (
        db.query(Review)
        .filter(Review.movie_id == movie_id)
        .order_by(Review.created_at.desc())
        .all()
    )


@router.delete("/{review_id}")
def delete_review(review_id: int, db: Session = Depends(get_db)):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    db.delete(review)
    db.commit()
    return {"message": "Review deleted"}
