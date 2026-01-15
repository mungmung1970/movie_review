import type { Review } from "../types/review";

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <div>
      <h3>📝 리뷰</h3>
      {reviews.map((r) => (
        <div key={r.id} style={{ borderBottom: "1px solid #ddd" }}>
          <p>{r.content}</p>
          <small>
            {r.sentiment_score}점 ({r.sentiment_source})
          </small>
        </div>
      ))}
    </div>
  );
}
