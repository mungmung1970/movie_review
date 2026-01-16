import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface Props {
  movies: Movie[];
  selectedId: number | null;
  onSelect: (movie: Movie) => void;
  onDelete: (id: number) => void;
}

export default function MovieCarousel({
  movies,
  selectedId,
  onSelect,
  onDelete,
}: Props) {
  return (
    <div
      style={{
        height: 340,            // ⭐ 캐러셀 전체 높이 고정
        paddingBottom: 8,
      }}
    >
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerGroup={1}
        style={{ height: "100%" }}   // ⭐ Swiper가 부모 높이를 따르게
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 10 }, // ✅ 데스크톱에서만 10개
        }}
      >
        {movies.map((m) => (
          <SwiperSlide
            key={m.id}
            style={{ height: "100%" }} // ⭐ 슬라이드 높이 고정
          >
            <MovieCard
              movie={m}
              selected={m.id === selectedId}
              onClick={() => onSelect(m)}
              onDelete={() => onDelete(m.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
