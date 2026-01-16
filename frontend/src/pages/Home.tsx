import "./Home.css";

import { useEffect, useState } from "react";

import MovieCarousel from "../components/MovieCarousel";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

import { getMovies, deleteMovie } from "../api/movieApi";
import { getReviewsByMovie } from "../api/reviewApi";

import type { Movie } from "../types/movie";
import type { Review } from "../types/review";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selected, setSelected] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  /** 영화 목록 로드 */
  const loadMovies = async () => {
    const data = await getMovies();
    setMovies(data);
  };

  /** 특정 영화의 리뷰 로드 */
  const loadReviews = async (movieId: number) => {
    const data = await getReviewsByMovie(movieId);
    setReviews(data);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div className="page">
      {/* ================= 영화 영역 ================= */}
      <section className="movie-section">
        <h2>🎬 영화 목록</h2>

        <MovieCarousel
          movies={movies}
          selectedId={selected?.id ?? null}
          onSelect={(movie) => {
            setSelected(movie);
            loadReviews(movie.id);
          }}
          onDelete={async (id) => {
            await deleteMovie(id);
            setSelected(null);
            setReviews([]);
            loadMovies();
          }}
        />
      </section>

      {/* ================= 리뷰 영역 ================= */}
      <section className="review-section">
        {selected ? (
          <>
            <h2>🎥 {selected.title}</h2>

            <ReviewList reviews={reviews} />

            <ReviewForm
              movieId={selected.id}
              onCreated={() => loadReviews(selected.id)}
            />
          </>
        ) : (
          <p className="review-placeholder">
            영화를 선택해주세요
          </p>
        )}
      </section>
    </div>
  );
}
