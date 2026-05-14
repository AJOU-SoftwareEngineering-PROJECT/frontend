import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import MyPage from "./pages/MyPage";
import AuthorDashboard from "./pages/AuthorDashboard";
import Reader from "./pages/Reader";
import Playlists from "./pages/Playlists";
import SimplePage from "./pages/SimplePage";
import Scraps from "./pages/Scraps";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<Reader />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/author" element={<AuthorDashboard />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/scraps" element={<Scraps />} />
        <Route path="/requirements" element={<SimplePage title="Requirements" description="프로젝트 요구사항 정의서와 기능 명세를 정리하는 화면입니다." />} />
        <Route path="/settings" element={<SimplePage title="Settings" description="계정, 알림, 독서 스타일 설정 화면입니다." />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
