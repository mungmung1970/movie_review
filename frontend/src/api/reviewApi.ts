// src/api/reviewApi.ts

import api from "./axios";
import type {
  Review,
  ReviewCreate,
} from "../types/review";

/**
 * 전체 리뷰 조회 (최신순)
 */
export const getReviews = async (): Promise<Review[]> => {
  const res = await api.get<Review[]>("/reviews");
  return res.data;
};

/**
 * 특정 영화의 리뷰 조회
 */
export const getReviewsByMovie = async (
  movieId: number
): Promise<Review[]> => {
  const res = await api.get<Review[]>(`/reviews/movie/${movieId}`);
  return res.data;
};

/**
 * 리뷰 등록
 * → FastAPI에서 감성 분석 자동 수행
 */
export const createReview = async (
  payload: ReviewCreate
): Promise<Review> => {
  const res = await api.post<Review>("/reviews", payload);
  return res.data;
};

/**
 * 리뷰 삭제
 */
export const deleteReview = async (
  reviewId: number
): Promise<void> => {
  await api.delete(`/reviews/${reviewId}`);
};
