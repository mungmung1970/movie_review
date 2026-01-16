import type { Review } from "../types/review";

interface Props {
  reviews: Review[];
}

export default function ReviewList({ reviews }: Props) {
  if (reviews.length === 0) {
    return (
      <div style={{ color: "#888", marginTop: 20 }}>
        아직 리뷰가 없습니다.
      </div>
    );
  }

  return (
    <div className="review-grid">
      {reviews.map((r) => (
        <div className="review-card" key={r.id}>
          <h4>{r.author}</h4>
          <p>{r.content}</p>
          <small>
            점수: {r.sentiment_score} / {r.sentiment_source}
          </small>
        </div>
      ))}
    </div>    
  );
}
