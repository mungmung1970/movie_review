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
          <div className="poster-placeholder" />
        )}
      </div>

      <h4 className="movie-title">{movie.title}</h4>

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
