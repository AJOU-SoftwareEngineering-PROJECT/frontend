import PageShell from "../components/PageShell";
import { authorBooks } from "../data/mockData";
import { BookOpen, Eye, Lock, PenLine, Plus, Trash2 } from "lucide-react";

export default function AuthorDashboard() {
  return (
    <PageShell>
      <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 p-5 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
            <div>
              <h1 className="text-4xl font-black tracking-tight">작가 대시보드</h1>
              <p className="text-sm text-slate-500 mt-2">작품을 관리하고 새로운 이야기를 만들어보세요.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="secondary-button">대시보드</button>
              <button className="secondary-button">라이브러리</button>
              <button className="primary-button">작가 프로필</button>
            </div>
          </div>

          <button className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-violet-700">
            <Plus size={17} /> 새 책방 만들기
          </button>

          <section className="grid md:grid-cols-2 gap-6">
            {authorBooks.map((book) => (
              <div key={book.title} className="card p-6 hover:-translate-y-1 transition">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="font-black text-xl">{book.title}</h2>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${book.status === "공개" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                        {book.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 leading-6">{book.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-5">
                  <span className="inline-flex items-center gap-1"><BookOpen size={14} /> {book.chapters}개 챕터</span>
                  <span className="inline-flex items-center gap-1"><Eye size={14} /> {book.views.toLocaleString()}회</span>
                  <span className="bg-violet-50 text-violet-600 px-2.5 py-1 rounded-full">{book.tag}</span>
                </div>

                <p className="text-xs text-slate-400 mb-5">생성일 2026-04-11</p>

                <div className="flex flex-wrap gap-2">
                  <button className="secondary-button inline-flex items-center gap-2"><PenLine size={15} /> 편집</button>
                  <button className="secondary-button inline-flex items-center gap-2"><Lock size={15} /> {book.status === "공개" ? "비공개" : "공개"}</button>
                  <button className="secondary-button inline-flex items-center gap-2 text-red-600"><Trash2 size={15} /> 삭제</button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </PageShell>
  );
}
