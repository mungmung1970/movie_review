// src/api/movieApi.ts

import api from "./axios";
import type { Movie, MovieCreate } from "../types/movie";

/**
 * 전체 영화 목록 조회
 */
export const getMovies = async (): Promise<Movie[]> => {
  const res = await api.get<Movie[]>("/movies");
  return res.data;
};

/**
 * 영화 단건 조회
 */
export const getMovie = async (movieId: number): Promise<Movie> => {
  const res = await api.get<Movie>(`/movies/${movieId}`);
  return res.data;
};

/**
 * 영화 등록
 */
export const createMovie = async (
  payload: MovieCreate
): Promise<Movie> => {
  const res = await api.post<Movie>("/movies", payload);
  return res.data;
};

/**
 * 영화 삭제
 */
export const deleteMovie = async (movieId: number): Promise<void> => {
  await api.delete(`/movies/${movieId}`);
};
