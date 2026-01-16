import type { Movie } from "../types/movie";

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
      onClick={onClick}
      style={{
        border: selected ? "2px solid #c9a24d" : "1px solid #ddd",
        borderRadius: 10,
        padding: 10,
        background: "#f5f5f5",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {movie.poster_url ? (
        <img
          src={movie.poster_url}
          alt={movie.title}
          style={{
            width: "100%",
            height: 160,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      ) : (
        <div
          style={{
            height: 160,
            background: "#ddd",
            borderRadius: 8,
          }}
        />
      )}

      <h4 style={{ marginTop: 8, fontSize: 14 }}>{movie.title}</h4>

      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          🗑
        </button>
      )}
    </div>
  );
}
