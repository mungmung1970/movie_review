import { useEffect, useState } from "react";
import { getReviewsByMovie } from "../api/reviewApi";
import type { Review } from "../types/review";

interface Props {
  movieId: number;
}

export default function ReviewList({ movieId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    getReviewsByMovie(movieId).then(setReviews);
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>아직 등록된 리뷰가 없습니다.</p>;
  }

  return (
    <div>
      <h4>리뷰 목록</h4>

      {reviews.map((r) => (
        <div
          key={r.id}
          style={{
            borderBottom: "1px solid #eee",
            padding: "8px 0",
          }}
        >
          <p>{r.content}</p>

          <small>
            작성자: {r.author} |{" "}
            {r.sentiment_score >= 4
              ? "😊 긍정"
              : r.sentiment_score >= 3
              ? "😐 중립"
              : "😞 부정"}
            {" "}({r.sentiment_source})
          </small>
        </div>
      ))}
    </div>
  );
}
