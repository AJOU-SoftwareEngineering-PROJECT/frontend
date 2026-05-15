import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { books as mockBooks } from "../data/mockData";
import {
  ArrowLeft,
  Bookmark,
  Heart,
  Menu,
  MessageCircle,
  MoreVertical,
  Play,
  Search,
  Send,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import {
  createScrap,
  createSentenceComment,
  getBooks,
  getSentenceComments,
} from "../services/api";

const paragraphsLeft = [
  "The morning mist clung to the valley floor like a forgotten memory, thick and heavy with the scent of damp pine and cold stone.",
  "Somewhere in the distance, a lone bell tolled—a slow, rhythmic pulse that echoed against the crags of the sleeping mountains.",
  "Elias moved through the high grass, his footsteps silent. He had spent a lifetime chasing the quiet, believing that if he could only find the place where the world stopped shouting, he might finally hear his own heart.",
  "‘Is anybody there?’ he whispered. The words were swallowed instantly by the vastness. But then, it came—not a reply, but a vibration. A ripple began at the center of the tarn, moving outward in perfect, concentric circles.",
];

const paragraphsRight = [
  "The ripple continued across the water until it touched the stones at Elias's feet.",
  "He lowered himself beside the tarn and waited, unsure whether he was afraid or relieved.",
  "The silence did not answer him, but for the first time in years, it did not feel empty.",
  "Somewhere beneath the surface, something remembered his name.",
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

export default function Reader() {
  const { bookId } = useParams();

  const sentenceId = 1;

  const [book, setBook] = useState(
    mockBooks.find((item) => String(item.id) === String(bookId)) || mockBooks[0]
  );

  const [showComments, setShowComments] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [toast, setToast] = useState("");

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [commentError, setCommentError] = useState("");

  useEffect(() => {
    getBooks()
      .then((data) => {
        const normalized = Array.isArray(data) ? data.map(normalizeBook) : [];
        const matched =
          normalized.find((item) => String(item.id) === String(bookId)) ||
          normalized[0];

        if (matched) {
          setBook(matched);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [bookId]);

  useEffect(() => {
    getSentenceComments(sentenceId)
      .then((data) => {
        setComments(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error(error);
        setCommentError(
          "백엔드 댓글 연결에 실패했습니다. 임시 댓글을 표시합니다."
        );
        setComments([
          {
            id: "mock-1",
            content:
              "The way the author describes the search for silence is so relatable.",
            user_id: 1,
            like_count: 31,
          },
          {
            id: "mock-2",
            content: "This is awesome!",
            user_id: 2,
            like_count: 2,
          },
        ]);
      });
  }, []);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };

  const handleSubmitComment = async () => {
    const content = commentInput.trim();

    if (!content) {
      return;
    }

    try {
      const newComment = await createSentenceComment(sentenceId, content);
      setComments((prev) => [...prev, newComment]);
      setCommentInput("");
      setCommentError("");
      showToast("Comment saved.");
    } catch (error) {
      console.error(error);
      setCommentError("댓글 저장에 실패했습니다.");
      showToast("Comment failed.");
    }
  };

  const toggleBookmark = async () => {
    try {
      await createScrap(sentenceId);
      setBookmarked(true);
      showToast("This sentence has been bookmarked.");
    } catch (error) {
      console.error(error);
      setBookmarked((prev) => !prev);
      showToast("Bookmark failed. Backend connection required.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f4ed] pb-28 text-slate-900">
      <header className="h-12 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            to="/books"
            className="w-8 h-8 rounded-full hover:bg-slate-100 grid place-items-center"
          >
            <ArrowLeft size={17} />
          </Link>

          <div>
            <h1 className="text-sm font-semibold leading-4">{book.title}</h1>
            <p className="text-[11px] text-slate-500">{book.author}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <Link
            to={`/books/${book.id}/edit`}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-600"
          >
            Edit
          </Link>

          <Search size={16} />
          <Menu size={17} />
        </div>
      </header>

      <section className="max-w-6xl mx-auto mt-8 px-7">
        <article className="bg-[#fffdf9] border border-[#eee7da] min-h-[640px] px-8 py-10 shadow-sm relative">
          <div className="grid md:grid-cols-2 gap-12 text-[14px] leading-7">
            <div className="space-y-5">
              {paragraphsLeft.map((text, index) => {
                const isHighlighted = index === 2;

                return (
                  <p key={index}>
                    {isHighlighted ? (
                      <button
                        onClick={() => setShowComments(!showComments)}
                        className="text-left bg-blue-100 hover:bg-blue-200 transition rounded px-1 leading-7"
                      >
                        {text}
                      </button>
                    ) : (
                      text
                    )}
                  </p>
                );
              })}
            </div>

            <div className="space-y-5 relative">
              {paragraphsRight.map((text, index) => (
                <p key={index}>{text}</p>
              ))}

              {showComments && (
                <div className="absolute left-0 top-24 w-[390px] max-w-[90vw] bg-white border border-slate-200 shadow-xl rounded-sm z-30">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <MessageCircle size={17} />
                      <h3 className="text-sm font-bold">Sentence Comments</h3>
                    </div>

                    {commentError && (
                      <p className="text-xs text-red-500 mt-2">
                        {commentError}
                      </p>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto">
                    {comments.length === 0 ? (
                      <div className="px-4 py-6 text-sm text-slate-500">
                        아직 댓글이 없습니다. 첫 댓글을 작성해보세요.
                      </div>
                    ) : (
                      comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="px-4 py-3 border-b border-slate-100 flex items-start gap-3"
                        >
                          <MessageCircle
                            size={18}
                            className="mt-1 text-slate-700"
                          />

                          <div className="flex-1">
                            <p className="font-semibold text-sm">
                              User {comment.user_id || "Guest"}
                              <span className="text-xs text-slate-400 font-normal ml-2">
                                now
                              </span>
                            </p>

                            <p className="text-sm text-slate-600 mt-1 leading-5">
                              {comment.content}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                              <button className="inline-flex items-center gap-1 hover:text-blue-600">
                                <Heart size={13} />
                                {comment.like_count || 0}
                              </button>
                              <button className="hover:text-blue-600">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="px-4 py-3 flex items-center gap-2">
                    <input
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSubmitComment();
                        }
                      }}
                      className="flex-1 text-sm outline-none"
                      placeholder="Add a thought..."
                    />

                    <button
                      onClick={handleSubmitComment}
                      className="text-slate-500 hover:text-blue-600"
                    >
                      <Send size={16} />
                    </button>

                    <button
                      onClick={toggleBookmark}
                      className={
                        bookmarked
                          ? "text-yellow-500"
                          : "text-slate-500 hover:text-yellow-500"
                      }
                    >
                      <Bookmark
                        size={16}
                        fill={bookmarked ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </section>

      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white border border-slate-200 shadow-xl rounded-full px-12 py-4 text-sm text-slate-500 z-50">
          {toast}
        </div>
      )}

      <footer className="fixed left-0 right-0 bottom-0 bg-white border-t border-slate-200 h-[76px] z-40">
        <div className="h-1.5 bg-slate-100 relative">
          <div className="h-full bg-red-600 w-[42%]" />
          <div className="absolute left-[42%] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-red-600" />
        </div>

        <div className="max-w-6xl mx-auto px-6 h-[70px] flex items-center justify-between">
          <div className="flex items-center gap-3 w-72">
            <div className="w-11 h-11 border border-slate-300 bg-white grid place-items-center">
              <div className="w-7 h-7 border-l-4 border-b-4 border-slate-900 rounded-bl-lg" />
            </div>

            <div>
              <p className="text-xs font-semibold">Weightless</p>
              <p className="text-[11px] text-slate-500">Marconi Union</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-700">
            <SkipBack size={16} />

            <button className="w-9 h-9 rounded-full bg-slate-900 text-white grid place-items-center">
              <Play size={15} fill="currentColor" />
            </button>

            <SkipForward size={16} />
            <Volume2 size={16} />

            <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-9 h-full bg-slate-900" />
            </div>

            <Menu size={16} />
            <MoreVertical size={16} />
          </div>
        </div>
      </footer>
    </main>
  );
}