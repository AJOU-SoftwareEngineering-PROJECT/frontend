import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import TopHeader from "../components/TopHeader";
import { sentenceComments } from "../data/mockData";
import { getMyScraps } from "../services/scraps";

export default function Scraps() {
  const [scraps, setScraps] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyScraps();
        setScraps(data || []);
      } catch (e) {
        setError("백엔드 인증/연결 이슈로 mock 스크랩을 표시합니다.");
        setScraps(
          sentenceComments.map((s, i) => ({
            id: i + 1,
            sentence_content: s.sentence,
            book_name: "Mock Book",
            chapter: 1
          }))
        );
      }
    };
    load();
  }, []);

  return (
    <PageShell>
      <main className="p-5 md:p-8 max-w-5xl mx-auto">
        <TopHeader title="Scraps" subtitle="스크랩한 문장을 모아보는 화면입니다." />
        {error && <p className="text-xs text-amber-600 mb-3">{error}</p>}
        <section className="card p-6 space-y-4">
          {scraps.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-800">{item.sentence_content}</p>
              <p className="text-xs text-slate-500 mt-2">
                {item.book_name} · Chapter {item.chapter}
              </p>
            </div>
          ))}
        </section>
      </main>
    </PageShell>
  );
}
