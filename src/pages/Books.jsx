import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import TopHeader from "../components/TopHeader";
import BookCard from "../components/BookCard";
import { BookOpen, Columns2, Moon, MessageSquare, Music2, Plus } from "lucide-react";
import { getBooks } from "../services/api";
import { books as mockBooks } from "../data/mockData";

const readingModes = [
  {
    title: "Classic View",
    description: "일반 독서 화면",
    icon: BookOpen,
    active: true,
  },
  {
    title: "Dual Panel",
    description: "책과 댓글을 함께 보기",
    icon: Columns2,
    active: false,
  },
  {
    title: "Night Mode",
    description: "다크 모드로 읽기",
    icon: Moon,
    active: false,
  },
];

function normalizeBook(book) {
  return {
    id: book.id,
    title: book.name || book.title || "Untitled Book",
    author: book.author_name || book.author || "Unknown Author",
    description:
      book.intro ||
      book.description ||
      "문장별 댓글과 음악 추천을 통해 독서 경험을 공유할 수 있는 책입니다.",
    chapters: book.chapters || 1,
    status: book.status || "공개 중",
    gradient: book.gradient || "from-blue-100 via-slate-100 to-white",
    like_count: book.like_count || 0,
  };
}

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    getBooks()
      .then((data) => {
        const normalized = Array.isArray(data) ? data.map(normalizeBook) : [];
        setBooks(normalized.length > 0 ? normalized : mockBooks);
        setServerMessage("백엔드에서 책 목록을 불러왔습니다.");
      })
      .catch((error) => {
        console.error(error);
        setBooks(mockBooks);
        setServerMessage(
          "백엔드 연결에 실패해서 임시 데이터로 화면을 표시합니다."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <PageShell>
      <TopHeader
        title="Books"
        subtitle="책을 선택하고 문장별 댓글과 음악 추천을 함께 경험하세요."
        right={
          <button className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-semibold">
            <Plus size={16} />
            Add Book
          </button>
        }
      />

      <section className="mt-8">
        <h3 className="font-bold text-lg mb-4">독서 스타일 선택</h3>

        <div className="grid md:grid-cols-3 gap-4">
          {readingModes.map((mode) => {
            const Icon = mode.icon;

            return (
              <div
                key={mode.title}
                className={`bg-white border rounded-2xl p-5 shadow-sm ${
                  mode.active ? "border-blue-500" : "border-slate-200"
                }`}
              >
                <Icon
                  size={24}
                  className={mode.active ? "text-blue-600" : "text-slate-500"}
                />

                <h4 className="font-bold mt-4">{mode.title}</h4>
                <p className="text-sm text-slate-500 mt-1">
                  {mode.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg">추천 도서</h3>
            <p className="text-sm text-slate-500 mt-1">
              각 문장마다 독자들의 생각을 나누고, 어울리는 음악과 함께 읽어보세요.
            </p>
          </div>

          <p className="text-xs text-slate-500">{serverMessage}</p>
        </div>

        {loading ? (
          <div className="bg-white border rounded-2xl p-8 text-sm text-slate-500">
            책 목록을 불러오는 중입니다...
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>

      <section className="grid md:grid-cols-2 gap-5 mt-8">
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <MessageSquare className="text-blue-600" size={24} />
          <h4 className="font-bold mt-4">문장별 댓글</h4>
          <p className="text-sm text-slate-500 mt-2 leading-6">
            각 문장을 클릭하면 댓글을 남기고 다른 독자들과 의견을 공유할 수 있습니다.
            문장 하나하나가 토론의 시작점이 됩니다.
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <Music2 className="text-violet-600" size={24} />
          <h4 className="font-bold mt-4">음악 스트리밍</h4>
          <p className="text-sm text-slate-500 mt-2 leading-6">
            독자는 책 분위기에 맞는 음악을 추천하고 좋아요를 누를 수 있습니다.
            좋아요 순으로 인기 음악을 확인할 수 있습니다.
          </p>
        </div>
      </section>
    </PageShell>
  );
}