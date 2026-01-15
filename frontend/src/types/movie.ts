//==============================================
// 영화 엔티티 단일 책임
// FastAPI schemas/movie.py와 1:1 대응
// 사용하는 곳, movieApi.ts, MovieCard.tsx, 
// Home.tsx
//==============================================

export interface Movie {
  id: number;
  title: string;
  release_date: string | null;
  director: string | null;
  genre: string | null;
  poster_url: string | null;
  created_at: string;
}

export interface MovieCreate {
  title: string;
  release_date?: string;
  director?: string;
  genre?: string;
  poster_url?: string;
}
