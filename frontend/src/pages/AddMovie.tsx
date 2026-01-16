import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMovie } from "../api/movieApi";
import "../styles/form.css";

export default function AddMovie() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [posterUrl, setPosterUrl] = useState("");

  const submitMovie = async () => {
    if (!title) return;
    await createMovie({
      title,
      release_date: releaseDate || undefined,
      director,
      genre,
      poster_url: posterUrl,
    });
    navigate("/");
  };

  return (
    <div className="form-card">
      <h3>➕ 영화 추가</h3>

      <input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
      <input placeholder="감독" value={director} onChange={(e) => setDirector(e.target.value)} />
      <input placeholder="장르" value={genre} onChange={(e) => setGenre(e.target.value)} />
      <input placeholder="포스터 URL" value={posterUrl} onChange={(e) => setPosterUrl(e.target.value)} />

      <button onClick={submitMovie}>등록</button>
    </div>
  );
}
