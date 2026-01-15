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
