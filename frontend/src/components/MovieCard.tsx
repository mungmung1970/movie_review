import type { Movie } from "../types/movie";
import "./MovieCard.css";

interface Props {
  movie: Movie;
  selected: boolean;
  onClick: () => void;
  onDelete?: () => void;
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
      <div className="poster-wrapper">
        {movie.poster_url ? (
          <img src={movie.poster_url} alt={movie.title} />
        ) : (
          <div className="poster-empty">NO IMAGE</div>
        )}
      </div>

      <div className="movie-info">
        <h4>{movie.title}</h4>
        <p>감독: {movie.director}</p>
        <p>장르: {movie.genre}</p>
      </div>

      {onDelete && (
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          🗑
        </button>
      )}
    </div>
  );
}
