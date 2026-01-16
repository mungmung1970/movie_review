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
    <div className="review-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 16,
        marginTop: 20,
      }}
    >
      {reviews.map((r) => (
        <div
          key={r.id}
          style={{
            background: "#f4f4f4",
            padding: 16,
            borderRadius: 12,
          }}
        >
          <strong>{r.author}</strong>
          <p style={{ margin: "8px 0" }}>{r.content}</p>
          <small>
            점수: {r.sentiment_score} / {r.sentiment_source}
          </small>
        </div>
      ))}
    </div>
  );
}
