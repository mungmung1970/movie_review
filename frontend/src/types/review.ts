//==============================================
//리뷰 엔티티 단일 책임
//감성 분석 결과 포함
//FastAPI schemas/review.py와 1:1 대응
//사용하는 곳: reviewApi.ts, ReviewList.tsx, ReviewForm.tsxMovieDetail.tsx
//==============================================

export interface Review {
  id: number;
  movie_id: number;
  author: string;
  content: string;
  sentiment_score: number;   // 1~5
  sentiment_source: string; // huggingface | rule-based
  created_at: string;
}

export interface ReviewCreate {
  movie_id: number;
  author: string;
  content: string;
}
