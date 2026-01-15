# app/routers/reviews.py

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
    sentiment = analyze_sentiment(review.content)

    db_review = Review(
        movie_id=review.movie_id,
        author=review.author,
        content=review.content,
        sentiment_score=sentiment["score"],
        sentiment_source=sentiment["source"],
    )

    db.add(db_review)
    db.commit()
    db.refresh(db_review)
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
