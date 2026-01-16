import "./ReviewList.css";
import type { Review } from "../types/review";

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="review-grid">
      {reviews.map((r) => (
        <div key={r.id} className="review-card">
          <div className="review-author">{r.author}</div>
          <div className="review-content">{r.content}</div>
          <div className="review-score">
            ⭐ {r.sentiment_score} ({r.sentiment_source})
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ReviewList({ reviews }) {
  if (!reviews.length) {
    return <p style={{ color: "#999" }}>아직 리뷰가 없습니다.</p>;
  }

  return (
    <div className="review-grid">
      {reviews.map((r) => (
        <div key={r.id} className="review-card">
          <p>{r.content}</p>
          <small>
            {r.sentiment_score}점 · {r.sentiment_source}
          </small>
        </div>
      ))}
    </div>
  );
}
