//==============================================
//AddMovie.tsx — 영화 등록 페이지
//역할: 영화 추가 폼
//API: createMovie()
//책임: 입력 → 등록 → 완료 처리
//==============================================
// src/pages/AddMovie.tsx
// src/pages/AddMovie.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMovie } from "../api/movieApi";

export default function AddMovie() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [posterUrl, setPosterUrl] = useState("");

  const submitMovie = async () => {
    if (!title) {
      alert("제목은 필수입니다.");
      return;
    }

    try {
      await createMovie({
        title,
        release_date: releaseDate || undefined,
        director,
        genre,
        poster_url: posterUrl,
      });

      alert("영화가 등록되었습니다."); // ✅ 핵심
      navigate("/");
    } catch (error) {
      alert("영화 등록에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>➕ 영화 등록</h2>

      <input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <input
        type="date"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
      />

      <br />

      <input
        placeholder="감독"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
      />

      <br />

      <input
        placeholder="장르"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <br />

      <input
        placeholder="포스터 URL"
        value={posterUrl}
        onChange={(e) => setPosterUrl(e.target.value)}
      />

      <br />

      <button onClick={submitMovie}>등록</button>
      <button onClick={() => navigate("/")}>취소</button>
    </div>
  );
}
