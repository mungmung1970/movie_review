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
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={16}
      slidesPerView={10}     // ← 한 화면에 최대 10개
      slidesPerGroup={10}
      style={{ paddingBottom: 12 }}
    >      
      {movies.map((m) => (
        <SwiperSlide key={m.id}>
          <MovieCard
            movie={m}
            selected={m.id === selectedId}
            onClick={() => onSelect(m)}
            onDelete={() => onDelete(m.id)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}


