import { useState } from "react";
import { createReview } from "../api/reviewApi";
import "../styles/form.css";

export default function ReviewForm({
  movieId,
  onCreated,
}: {
  movieId: number;
  onCreated: () => void;
}) {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const submit = async () => {
    if (!author || !content) return;
    await createReview({ movie_id: movieId, author, content });
    setContent("");
    setAuthor("");
    onCreated();
  };

  return (
    <div className="form-card">
      <h4>✍ 리뷰 작성</h4>

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

      <button onClick={submit}>등록</button>
    </div>
  );
}
