import "./Home.css";

export default function Home() {
  return (
    <div className="page">
      <section className="movie-section">
        <h2>🎬 영화 목록</h2>
        <MovieCarousel ... />
      </section>

      <section className="review-section">
        {selected ? (
          <>
            <h2>🎥 {selected.title}</h2>
            <ReviewList reviews={reviews} />
            <ReviewForm ... />
          </>
        ) : (
          <p style={{ color: "#888" }}>영화를 선택해주세요</p>
        )}
      </section>
    </div>
  );
}
