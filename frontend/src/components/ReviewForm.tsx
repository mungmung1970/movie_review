import { useState } from "react";
import { createReview } from "../api/reviewApi";
import "./ReviewForm.css";

interface Props {
  movieId: number;
  onCreated: () => void;
}

export default function ReviewForm({ movieId, onCreated }: Props) {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!author.trim() || !content.trim()) {
      alert("작성자와 리뷰 내용을 입력해 주세요.");
      return;
    }

    try {
      setLoading(true);
      await createReview({
        movie_id: movieId,
        author: author.trim(),
        content: content.trim(),
      });

      setAuthor("");
      setContent("");
      onCreated();
    } catch (err) {
      alert("리뷰 등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-form">
      <h4>➕ 리뷰 작성</h4>

      <input
        placeholder="작성자"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <textarea
        placeholder="리뷰 내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={submit} disabled={loading}>
        {loading ? "등록 중..." : "등록"}
      </button>
    </div>
  );
}
