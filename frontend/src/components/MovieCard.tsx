import type { Movie } from "../types/movie";
import "./MovieCard.css";

interface Props {
  movie: Movie;
  selected: boolean;
  onClick: () => void;
  onDelete?: () => void; // ⭐ 추가
}

export default function MovieCard({
  movie,
  selected,
  onClick,
  onDelete,
}: Props) {
  return (
    <div
      className={`movie-card ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {movie.poster_url && (
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="movie-poster"
        />
      )}

      <div className="movie-title">{movie.title}</div>
      <div className="movie-meta">감독: {movie.director}</div>
      <div className="movie-meta">장르: {movie.genre}</div>

      {/* ⭐ 여기! 삭제 버튼 */}
      {onDelete && (
        <button
          className="movie-delete-btn"
          onClick={(e) => {
            e.stopPropagation(); // 카드 클릭 방지
            onDelete();
          }}
        >
          🗑 삭제
        </button>
      )}
    </div>
  );
}
