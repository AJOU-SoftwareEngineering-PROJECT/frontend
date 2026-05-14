import PageShell from "../components/PageShell";
import { ArrowLeft, BookOpen, Edit3, Music2, PenTool, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

const tabs = ["개요", "추천 음악", "스크랩", "내 책"];

const activities = [
  { icon: "🔖", title: "문장을 스크랩했습니다", desc: "봄날의 소나타 · 2026-04-22", color: "bg-violet-50" },
  { icon: "🎵", title: "음악을 추천했습니다", desc: "Spring Day · 봄날의 소나타 책 배경", color: "bg-blue-50" },
  { icon: "📖", title: "책 읽기를 시작했습니다", desc: "밤하늘의 별 · 2026-04-20", color: "bg-emerald-50" }
];

export default function MyPage() {
  return (
    <PageShell>
      <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 p-5 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 mb-8">
            <ArrowLeft size={17} /> 대시보드로
          </Link>

          <section className="grid lg:grid-cols-[320px_1fr] gap-6">
            <div className="space-y-6">
              <div className="card p-6 text-center">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-black">내 프로필</h2>
                  <button className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center">
                    <Edit3 size={15} />
                  </button>
                </div>
                <div className="w-24 h-24 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-2xl text-slate-600 mb-4">
                  김
                </div>
                <h3 className="font-black text-xl">김독서</h3>
                <p className="text-sm text-slate-500 mt-1">reader@example.com</p>
                <p className="text-xs text-slate-500 mt-4">좋은 책과 음악을 사랑하는 독자입니다.</p>
                <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100">
                  <div>
                    <p className="font-black text-violet-600">3</p>
                    <p className="text-xs text-slate-500">내 책</p>
                  </div>
                  <div>
                    <p className="font-black text-blue-600">3</p>
                    <p className="text-xs text-slate-500">스크랩</p>
                  </div>
                  <div>
                    <p className="font-black text-pink-600">2</p>
                    <p className="text-xs text-slate-500">추천 음악</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-black mb-4">빠른 링크</h3>
                <div className="space-y-3">
                  <Link className="secondary-button w-full flex items-center gap-2 justify-start" to="/author"><PenTool size={16} /> 작가 대시보드</Link>
                  <Link className="secondary-button w-full flex items-center gap-2 justify-start" to="/scraps"><BookOpen size={16} /> 스크랩 모음</Link>
                  <Link className="secondary-button w-full flex items-center gap-2 justify-start" to="/playlists"><Music2 size={16} /> 플레이리스트</Link>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="bg-slate-100 rounded-full p-1 grid grid-cols-4 gap-1 mb-6">
                {tabs.map((tab, index) => (
                  <button key={tab} className={`rounded-full py-2 text-sm font-semibold ${index === 0 ? "bg-white shadow-sm" : "text-slate-500"}`}>{tab}</button>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  <UserRound size={21} />
                </div>
                <div>
                  <h2 className="font-black text-xl">최근 활동</h2>
                  <p className="text-sm text-slate-500">최근에 한 활동들을 확인하세요.</p>
                </div>
              </div>

              <div className="space-y-4">
                {activities.map((item) => (
                  <div key={item.title} className={`rounded-2xl p-5 ${item.color}`}>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <p className="font-bold text-slate-800">{item.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </PageShell>
  );
}
