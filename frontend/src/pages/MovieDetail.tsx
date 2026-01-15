//==============================================
//MovieDetail.tsx — 영화 상세 페이지
//역할: 영화 1편 상세 + 리뷰
//사용 컴포넌트:
//MovieCard
//ReviewForm
//ReviewList
//API:
//getMovie(id)
//getReviewsByMovie(id)
//==============================================

// src/pages/MovieDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "../api/movieApi";
import { getReviewsByMovie } from "../api/reviewApi";
import type { Movie } from "../types/movie";
import type { Review } from "../types/review";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

export default function MovieDetail() {
  const { id } = useParams();
  const movieId = Number(id);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const loadReviews = async () => {
    setReviews(await getReviewsByMovie(movieId));
  };

  useEffect(() => {
    loadReviews();
  }, [movieId]);

  return (
    <div>
      {movie && <h2>{movie.title}</h2>}

      <ReviewList reviews={reviews} />

      <ReviewForm
        movieId={movieId}
        onCreated={loadReviews}
      />
    </div>
  );
}
