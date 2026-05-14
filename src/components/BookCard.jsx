import { BookOpen, MessageSquare, Music2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <Link to={`/books/${book.id}`} className="group card overflow-hidden hover:-translate-y-1 transition duration-200">
      <div className={`h-64 bg-gradient-to-br ${book.gradient} flex items-center justify-center border-b border-slate-100`}>
        <div className="w-20 h-20 rounded-3xl bg-white/80 border border-white flex items-center justify-center shadow-sm group-hover:scale-105 transition">
          <BookOpen size={38} className="text-slate-700" />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-blue-700 group-hover:text-blue-800">{book.title}</h3>
        <p className="text-sm text-slate-500 mt-1">{book.author}</p>
        <p className="text-sm text-slate-600 mt-3 line-clamp-2">{book.description}</p>
        <div className="flex items-center gap-4 text-xs text-slate-500 mt-4">
          <span className="inline-flex items-center gap-1"><BookOpen size={14} /> {book.chapters} 챕터</span>
          <span className="inline-flex items-center gap-1"><MessageSquare size={14} /> 문장 댓글</span>
          <span className="inline-flex items-center gap-1"><Music2 size={14} /> 음악 추천</span>
        </div>
      </div>
    </Link>
  );
}
