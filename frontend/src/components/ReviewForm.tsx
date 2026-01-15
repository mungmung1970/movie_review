import { useState } from "react";
import { createReview } from "../api/reviewApi";

interface Props {
  movieId: number;
  onSuccess?: () => void;
}

export default function ReviewForm({ movieId, onSuccess }: Props) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (!author || !content) {
      alert("작성자와 리뷰 내용을 입력하세요.");
      return;
    }

    setLoading(true);
    try {
      await createReview({
        movie_id: movieId,
        author,
        content,
      });

      setAuthor("");
      setContent("");
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "16px" }}>
      <h4>리뷰 작성</h4>

      <input
        placeholder="작성자"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <br />

      <textarea
        placeholder="리뷰 내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
      />

      <br />

      <button onClick={submitReview} disabled={loading}>
        {loading ? "등록 중..." : "리뷰 등록"}
      </button>
    </div>
  );
}
