```
1️⃣ 전체 아키텍처 (확정)
React (Vercel)
   ↓ REST API (JSON)
FastAPI (Render)
   ↓
Supabase (Postgres + Auth)


📌 핵심 원칙

React는 오직 UI + API 호출

인증/DB/감성분석은 전부 백엔드

Supabase는 FastAPI에서만 접근

2️⃣ 최상위 프로젝트 구조 (제출 기준)
mission18/
   ├─ frontend/          # React (Vercel)
   ├─ backend/           # FastAPI (Render)
   ├─ report/
   │  └─ report.pdf
   └─ README.md

3️⃣ Backend (FastAPI) 권장 구조
backend/
├─ app/
│  ├─ main.py
│  │
│  ├─ core/
│  │  ├─ config.py          # ENV, CORS
│  │  └─ database.py        # Supabase / SQLAlchemy
│  │
│  ├─ models/
│  │  ├─ movie.py
│  │  └─ review.py
│  │
│  ├─ schemas/
│  │  ├─ movie.py
│  │  └─ review.py
│  │
│  ├─ routers/
│  │  ├─ movies.py          # CRUD
│  │  ├─ reviews.py
│  │  └─ sentiment.py
│  │
│  ├─ services/
│  │  ├─ movie_service.py
│  │  ├─ review_service.py
│  │  └─ sentiment_service.py
│  │
│  └─ utils/
│     └─ sentiment_rule.py  # 규칙 기반 분석
│
├─ requirements.txt
├─ .env
└─ README.md

CORS 설정 (필수)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-app.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

4️⃣ Frontend (React) 구조 (실무형)

Vercel + React + TypeScript 권장

frontend/
├─ src/
│  ├─ api/
│  │  ├─ axios.ts
│  │  ├─ movieApi.ts
│  │  └─ reviewApi.ts
│  │
│  ├─ components/
│  │  ├─ MovieCard.tsx
│  │  ├─ ReviewForm.tsx
│  │  └─ ReviewList.tsx
│  │
│  ├─ pages/
│  │  ├─ Home.tsx
│  │  ├─ MovieDetail.tsx
│  │  └─ AddMovie.tsx
│  │
│  ├─ types/
│  │  ├─ movie.ts
│  │  └─ review.ts
│  │
│  ├─ App.tsx
│  └─ main.tsx
│
├─ .env
├─ package.json
└─ README.md

5️⃣ FastAPI ↔ React 연동 방식
Axios 공통 설정
// src/api/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

VITE_API_URL=https://your-fastapi.onrender.com

영화 목록 조회
// src/api/movieApi.ts
import { api } from "./axios";

export const getMovies = async () => {
  const res = await api.get("/movies");
  return res.data;
};

// Home.tsx
useEffect(() => {
  getMovies().then(setMovies);
}, []);

6️⃣ 리뷰 등록 → 감성 분석 자동 실행 흐름
React
 └─ POST /reviews
      └─ FastAPI
           ├─ 리뷰 저장
           ├─ sentiment_rule 분석
           └─ 결과 함께 반환

FastAPI 예시
@router.post("/reviews")
def create_review(review: ReviewCreate):
    score = analyze_sentiment(review.content)
    return review_service.create(review, score)

7️⃣ ERD (보고서 필수)
Movie
- id (PK)
- title
- release_date
- director
- genre
- poster_url

Review
- id (PK)
- movie_id (FK)
- author
- content
- sentiment_score
- created_at

8️⃣ 배포 전략 요약
구성	플랫폼
React	Vercel
FastAPI	Render
DB/Auth	Supabase

```