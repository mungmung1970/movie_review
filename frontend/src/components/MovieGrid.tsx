import type { Movie } from "../types/movie";

interface Props {
  movie: Movie;
  selected: boolean;
  onClick: () => void;
  onDelete: () => void;
}

export default function MovieCard({
  movie,
  selected,
  onClick,
  onDelete,
}: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        border: selected ? "2px solid #4f46e5" : "1px solid #ddd",
        padding: 12,
        cursor: "pointer",
        position: "relative",
        background: "#fff",
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        style={{
          position: "absolute",
          top: 6,
          right: 6,
          fontSize: 12,
        }}
      >
        ❌
      </button>

      <h4>{movie.title}</h4>

      {movie.poster_url && (
        <img
          src={movie.poster_url}
          alt={movie.title}
          style={{ width: "100%" }}
        />
      )}

      <p>감독: {movie.director}</p>
      <p>장르: {movie.genre}</p>
    </div>
  );
}
