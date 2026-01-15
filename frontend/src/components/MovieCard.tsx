import type { Movie } from "../types/movie";

interface Props {
  movie: Movie;
  onClick?: () => void;
}

export default function MovieCard({ movie, onClick }: Props) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "12px",
        marginBottom: "12px",
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      <h3>{movie.title}</h3>

      {movie.poster_url && (
        <img
          src={movie.poster_url}
          alt={movie.title}
          width={120}
        />
      )}

      <p>감독: {movie.director ?? "-"}</p>
      <p>장르: {movie.genre ?? "-"}</p>
    </div>
  );
}
