import { Link, useParams } from "react-router-dom";
import { books } from "../data/mockData";
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
import { useState } from "react";

const paragraphsLeft = [
  "The morning mist clung to the valley floor like a forgotten memory, thick and heavy with the scent of damp pine and cold stone.",
  "Somewhere in the distance, a lone bell tolled—a slow, rhythmic pulse that echoed against the crags of the sleeping mountains.",
  "Elias moved through the high grass, his footsteps silent. He had spent a lifetime chasing the quiet, believing that if he could only find the place where the world stopped shouting, he might finally hear his own heart.",
  "‘Is anybody there?’ he whispered. The words were swallowed instantly by the vastness. But then, it came—not a reply, but a vibration. A ripple began at the center of the tarn, moving outward in perfect, concentric circles.",
  "‘Is anybody there?’ he whispered. The words were swallowed instantly by the vastness. But then, it came—not a reply, but a vibration. A ripple began at the center of the tarn, moving outward in perfect, concentric circles.",
];

const paragraphsRight = [
  "‘Is anybody there?’ he whispered. The words were swallowed instantly by the vastness. But then, it came—not a reply, but a vibration. A ripple began at the center of the tarn, moving outward in perfect, concentric circles.",
  "‘Is anybody there?’ he whispered. The words were swallowed instantly by the vastness. But then, it came—not a reply, but a vibration. A ripple began at the center of the tarn, moving outward in perfect, concentric circles.",
  "‘Is anybody there?’ he whispered. The words were swallowed instantly by the vastness. But then, it came—not a reply, but a vibration. A ripple began at the center of the tarn, moving outward in perfect, concentric circles.",
  "‘Is anybody there?’ he whispered. The words were swallowed instantly by the vastness. But then, it came—not a reply, but a vibration. A ripple began at the center of the tarn, moving outward in perfect, concentric circles.",
];

export default function Reader() {
  const { bookId } = useParams();
  const book = books.find((item) => item.id === bookId) || books[0];

  const [showComments, setShowComments] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [toast, setToast] = useState("");

  const toggleBookmark = () => {
    const next = !bookmarked;
    setBookmarked(next);

    setToast(
      next
        ? "This sentence has been bookmarked."
        : "This sentence has been unbookmarked."
    );

    window.setTimeout(() => setToast(""), 1800);
  };

  return (
    <main className="min-h-screen bg-[#f7f4ed] pb-28 text-slate-900">
      {/* Header */}
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

      {/* Book content */}
      <section className="max-w-6xl mx-auto mt-8 px-7">
        <article className="bg-[#fffdf9] border border-[#eee7da] min-h-[640px] px-8 py-10 shadow-sm relative">
          <div className="grid md:grid-cols-2 gap-12 text-[14px] leading-7">
            {/* Left column */}
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

            {/* Right column */}
            <div className="space-y-5 relative">
              {paragraphsRight.map((text, index) => (
                <p key={index}>{text}</p>
              ))}

              {/* Comment popup */}
              {showComments && (
                <div className="absolute left-0 top-24 w-[390px] max-w-[90vw] bg-white border border-slate-200 shadow-xl rounded-sm z-30">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-start gap-3">
                    <MessageCircle size={18} className="mt-1 text-slate-700" />

                    <div className="flex-1">
                      <p className="font-semibold text-sm">
                        Emma Chen{" "}
                        <span className="text-xs text-slate-400 font-normal">
                          5h ago
                        </span>
                      </p>

                      <p className="text-sm text-slate-600 mt-1 leading-5">
                        The way the author describes the search for silence is
                        so relatable. We're all looking for that quiet place.
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                        <button className="inline-flex items-center gap-1 hover:text-blue-600">
                          <Heart size={13} /> 31
                        </button>
                        <button className="hover:text-blue-600">Reply</button>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 border-b border-slate-100 flex items-start gap-3">
                    <MessageCircle size={18} className="mt-1 text-slate-700" />

                    <div className="flex-1">
                      <p className="font-semibold text-sm">
                        Ibrahim Choi{" "}
                        <span className="text-xs text-slate-400 font-normal">
                          10h ago
                        </span>
                      </p>

                      <p className="text-sm text-slate-600 mt-1 leading-5">
                        This is awesome!
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                        <button className="inline-flex items-center gap-1 hover:text-blue-600">
                          <Heart size={13} /> 2
                        </button>
                        <button className="hover:text-blue-600">Reply</button>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 flex items-center gap-2">
                    <input
                      className="flex-1 text-sm outline-none"
                      placeholder="Add a thought..."
                    />

                    <button className="text-slate-500 hover:text-blue-600">
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

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white border border-slate-200 shadow-xl rounded-full px-12 py-4 text-sm text-slate-500 z-50">
          {toast}
        </div>
      )}

      {/* Music player */}
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