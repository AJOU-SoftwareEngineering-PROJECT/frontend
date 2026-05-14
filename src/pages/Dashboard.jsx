import PageShell from "../components/PageShell";
import TopHeader from "../components/TopHeader";
import StatCard from "../components/StatCard";
import { stats, readingOverview, recentActivities } from "../data/mockData";
import {
  BookOpen,
  CheckCircle2,
  FileText,
  MessageSquare,
  Music2,
  Plus,
  UserRound,
  Users
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const icons = {
  Books: BookOpen,
  Chapters: FileText,
  Comments: MessageSquare,
  Completed: CheckCircle2,
  Readers: Users,
  Playlists: Music2
};

const quickActions = [
  { title: "Create Book", subtitle: "Start writing", icon: FileText, tone: "bg-violet-50 text-violet-600" },
  { title: "Add Music", subtitle: "Recommend songs", icon: Music2, tone: "bg-pink-50 text-pink-600" },
  { title: "View Scraps", subtitle: "Saved sentences", icon: MessageSquare, tone: "bg-blue-50 text-blue-600" },
  { title: "Browse Books", subtitle: "Explore library", icon: BookOpen, tone: "bg-emerald-50 text-emerald-600" }
];

export default function Dashboard() {
  return (
    <PageShell>
      <main className="p-5 md:p-8 max-w-7xl mx-auto">
        <TopHeader
          title="Project Dashboard"
          subtitle="Welcome back, admin. 독서 플랫폼의 전체 현황을 확인하세요."
          right={<button className="primary-button hidden sm:inline-flex items-center gap-2"><Plus size={17} /> New</button>}
        />

        <section className="grid sm:grid-cols-2 xl:grid-cols-6 gap-4 mb-6">
          {stats.map((item) => (
            <StatCard key={item.label} {...item} icon={icons[item.label]} />
          ))}
        </section>

        <section className="grid xl:grid-cols-[1fr_1.15fr] gap-6 mb-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black">Recent Activity</h3>
              <span className="text-xs text-slate-400">실시간 업데이트</span>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-lg">
                    {activity.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-700">{activity.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black">Reading Overview</h3>
              <span className="text-xs text-slate-400">Monthly readers</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={readingOverview}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: "#f8fafc" }} />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button key={action.title} className="card p-5 text-left hover:-translate-y-1 transition">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${action.tone}`}>
                  <Icon size={20} />
                </div>
                <h4 className="font-bold">{action.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{action.subtitle}</p>
              </button>
            );
          })}
        </section>

        <section className="mt-6 card p-6 bg-gradient-to-r from-violet-50 to-blue-50 border-violet-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-violet-600 shadow-sm">
              <UserRound size={22} />
            </div>
            <div>
              <h3 className="font-black">프로젝트 핵심 차별점</h3>
              <p className="text-sm text-slate-600 mt-2 leading-6">
                기존 독서 플랫폼은 리뷰와 댓글 기능은 있지만, 문장 단위로 독자들이 직접 의견을 남기고
                책 분위기에 맞는 음악을 추천하는 기능은 부족합니다. 이 프로젝트는 문장별 댓글과 음악 스트리밍을 통해
                사용자 간 상호작용을 강화합니다.
              </p>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
