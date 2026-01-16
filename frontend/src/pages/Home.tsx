//==============================================
// Home.tsx — 메인 진입 페이지
// 역할: 영화 목록 표시
// 사용 컴포넌트: MovieCard
// API: getMovies()
// 책임: 영화 리스트 
//==============================================

import { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "../api/movieApi";
import { getReviewsByMovie } from "../api/reviewApi";

import type { Movie } from "../types/movie";
import type { Review } from "../types/review";

import MovieCarousel from "../components/MovieCarousel";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selected, setSelected] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const loadMovies = async () => {
    setMovies(await getMovies());
  };

  const loadReviews = async (movieId: number) => {
    setReviews(await getReviewsByMovie(movieId));
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div>
      <h2>🎬 영화 목록</h2>

      <MovieCarousel
        movies={movies}
        selectedId={selected?.id ?? null}
        onSelect={(m) => {
          setSelected(m);
          loadReviews(m.id);
        }}
        onDelete={async (id) => {
          await deleteMovie(id);
          loadMovies();
        }}
      />

      {selected && (
        <>
          <hr />
          <h2>🎥 {selected.title}</h2>

          <ReviewList reviews={reviews} />

          <ReviewForm
            movieId={selected.id}
            onCreated={() => loadReviews(selected.id)}
          />
        </>
      )}
    </div>
  );
}
