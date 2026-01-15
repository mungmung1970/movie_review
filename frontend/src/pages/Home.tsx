//==============================================
// Home.tsx — 메인 진입 페이지
// 역할: 영화 목록 표시
// 사용 컴포넌트: MovieCard
// API: getMovies()
// 책임: 영화 리스트만 (리뷰/감성분석 ❌)
//==============================================

// src/pages/Home.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMovies } from "../api/movieApi";
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  return (
    <div>
      <h2>🎬 영화 목록</h2>

      {movies.length === 0 && <p>등록된 영화가 없습니다.</p>}

      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => navigate(`/movies/${movie.id}`)}
        />
      ))}

      <button onClick={() => navigate("/add")}>
        ➕ 영화 등록
      </button>
    </div>
  );
}
