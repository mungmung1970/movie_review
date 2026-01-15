import "./MovieCard.css";
import { Movie } from "../types/movie";

interface Props {
  movie: Movie;
  selected: boolean;
  onClick: () => void;
}

export default function MovieCard({ movie, selected, onClick }: Props) {
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
    </div>
  );
}
