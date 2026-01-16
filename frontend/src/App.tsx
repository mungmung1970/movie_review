// src/App.tsx

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";

import "./styles/theme.css";
import "./styles/responsive.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* ⭐ 전체 앱 다크 테마 래퍼 */}
      <div className="app-root">
        {/* 상단 네비게이션 */}
        <nav className="app-nav">
          <Link to="/">🏠 홈</Link>
          <Link to="/add">➕ 영화 추가</Link>
        </nav>

        {/* 메인 콘텐츠 영역 */}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddMovie />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
