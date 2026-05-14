import { Link, useParams } from "react-router-dom";
import PageShell from "../components/PageShell";
import { books, playlists, sentenceComments } from "../data/mockData";
import { ArrowLeft, BookOpen, Heart, MessageSquare, Music2, Send } from "lucide-react";

export default function Reader() {
  const { bookId } = useParams();
  const book = books.find((item) => item.id === bookId) || books[0];

  return (
    <PageShell>
      <main className="p-5 md:p-8 max-w-7xl mx-auto">
        <Link to="/books" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 mb-6">
          <ArrowLeft size={17} /> 도서 목록으로
        </Link>

        <section className="grid xl:grid-cols-[1fr_390px] gap-6">
          <article className="card p-6 md:p-8">
            <div className="flex items-start gap-4 mb-8">
              <div className={`w-20 h-24 rounded-2xl bg-gradient-to-br ${book.gradient} border flex items-center justify-center`}>
                <BookOpen className="text-slate-700" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight">{book.title}</h1>
                <p className="text-slate-500 mt-2">{book.author}</p>
                <p className="text-sm text-slate-600 mt-3">{book.description}</p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <h2 className="text-xl font-black mb-4">Chapter 1. 조용한 시작</h2>
              <p className="text-slate-500 text-sm mb-8">문장을 클릭하면 오른쪽 패널에서 댓글을 확인할 수 있습니다.</p>
            </div>

            <div className="space-y-5">
              {sentenceComments.map((item, index) => (
                <div key={index} className="group border border-transparent hover:border-blue-200 hover:bg-blue-50/40 rounded-2xl p-4 transition cursor-pointer">
                  <p className="text-lg leading-9 text-slate-800">{item.sentence}</p>
                  <div className="inline-flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full mt-3">
                    <MessageSquare size={14} /> {item.comments.length} comments
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="space-y-6">
            <div className="card p-6 sticky top-6">
              <h3 className="font-black flex items-center gap-2 mb-4">
                <MessageSquare size={19} className="text-blue-600" /> 문장별 댓글
              </h3>
              <div className="space-y-4 mb-5">
                {sentenceComments[0].comments.map((comment, index) => (
                  <div key={index} className="bg-slate-50 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-bold">Reader {index + 1}</p>
                      <span className="text-xs text-slate-400">방금 전</span>
                    </div>
                    <p className="text-sm text-slate-600">{comment}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-blue-100" placeholder="댓글을 입력하세요" />
                <button className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Send size={17} />
                </button>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-black flex items-center gap-2 mb-4">
                <Music2 size={19} className="text-pink-600" /> 추천 음악
              </h3>
              <div className="space-y-3">
                {playlists.map((item) => (
                  <div key={item.title} className="flex items-center justify-between bg-slate-50 rounded-2xl p-4">
                    <div>
                      <p className="font-bold text-sm">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.song}</p>
                    </div>
                    <button className="inline-flex items-center gap-1 text-xs text-pink-600 bg-pink-50 px-3 py-1.5 rounded-full">
                      <Heart size={13} /> {item.likes}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
    </PageShell>
  );
}
