import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface Props {
  movies: Movie[];
  selectedId: number | null;
  onSelect: (movie: Movie) => void;
  onDelete: (id: number) => void;
}

export default function MovieGrid({
  movies,
  selectedId,
  onSelect,
  onDelete,
}: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "16px",
      }}
    >
      {movies.map((m) => (
        <MovieCard
          key={m.id}
          movie={m}
          selected={m.id === selectedId}
          onClick={() => onSelect(m)}
          onDelete={() => onDelete(m.id)}
        />
      ))}
    </div>
  );
}
