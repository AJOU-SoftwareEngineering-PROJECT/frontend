import PageShell from "../components/PageShell";
import TopHeader from "../components/TopHeader";
import BookCard from "../components/BookCard";
import { books } from "../data/mockData";
import { BookOpen, Columns2, Moon, MessageSquare, Music2, Plus } from "lucide-react";

const readingModes = [
  {
    title: "Classic View",
    description: "일반 독서 화면",
    icon: BookOpen,
    active: true
  },
  {
    title: "Dual Panel",
    description: "책과 댓글을 함께 보기",
    icon: Columns2,
    active: false
  },
  {
    title: "Night Mode",
    description: "다크 모드로 읽기",
    icon: Moon,
    active: false
  }
];

export default function Books() {
  return (
    <PageShell>
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 p-5 md:p-8">
        <div className="max-w-7xl mx-auto">
          <TopHeader
            title="Books"
            subtitle="문장별 댓글과 음악 스트리밍이 가능한 독서 플랫폼"
            right={<button className="primary-button hidden sm:inline-flex items-center gap-2"><Plus size={17} /> Add Book</button>}
          />

          <section className="mb-7">
            <h3 className="font-black mb-4">독서 스타일 선택</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {readingModes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.title}
                    className={`card p-5 text-left transition hover:-translate-y-1 ${mode.active ? "border-blue-500 ring-4 ring-blue-100" : ""}`}
                  >
                    <Icon size={21} className={mode.active ? "text-blue-600" : "text-slate-500"} />
                    <h4 className="font-black mt-3">{mode.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{mode.description}</p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mb-7">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h3 className="font-black">추천 도서</h3>
                <p className="text-sm text-slate-500 mt-1">각 문장마다 독자들의 생각을 나누고, 어울리는 음악과 함께 읽어보세요.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {books.map((book) => <BookCard key={book.id} book={book} />)}
            </div>
          </section>

          <section className="card p-6">
            <h3 className="font-black mb-5">플랫폼 특징</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <MessageSquare size={22} />
                </div>
                <div>
                  <h4 className="font-bold">문장별 댓글</h4>
                  <p className="text-sm text-slate-600 mt-2 leading-6">
                    각 문장을 클릭하면 댓글을 남기고 다른 독자들과 의견을 공유할 수 있습니다. 문장 하나하나가 토론의 시작점이 됩니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
                  <Music2 size={22} />
                </div>
                <div>
                  <h4 className="font-bold">음악 스트리밍</h4>
                  <p className="text-sm text-slate-600 mt-2 leading-6">
                    독자는 책 분위기에 맞는 음악을 추천하고 좋아요를 누를 수 있습니다. 좋아요 순으로 인기 음악을 확인할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </PageShell>
  );
}
