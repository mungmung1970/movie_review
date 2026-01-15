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
import { useParams, useNavigate } from "react-router-dom";

import { getMovie } from "../api/movieApi";
import type { Movie } from "../types/movie";

import MovieCard from "../components/MovieCard";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (id) {
      getMovie(Number(id)).then(setMovie);
    }
  }, [id]);

  if (!movie) {
    return <p>로딩 중...</p>;
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>← 목록</button>

      <MovieCard movie={movie} />

      <ReviewForm
        movieId={movie.id}
        onSuccess={() => setReloadKey((k) => k + 1)}
      />

      {/* key를 이용해 리뷰 새로고침 */}
      <ReviewList
        key={reloadKey}
        movieId={movie.id}
      />
    </div>
  );
}
