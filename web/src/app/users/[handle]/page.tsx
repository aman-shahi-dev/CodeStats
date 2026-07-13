import { Navbar, Footer } from "@/components/layout";
import { IconMapPin, IconLink, IconExternalLink, IconTrophy, IconChartLine } from "@tabler/icons-react";

// This would come from API later
const profile = {
  handle: "amanshahidev",
  bio: "Competitive programmer. Legend of the game. Specializing in graph theory and dynamic programming. Currently ranked #1 globally on multiple competitive platforms.",
  location: "Noida, India",
  github: "github.com/aman-shahi-dev",
  rating: "3,842",
  ratingChange: "▲ 42",
  worldRank: "#1",
  totalSolved: "14,293",
  successRate: "94.8%",
  badges: [
    { label: "CODEFORCES LGM", color: "bg-cf-blue/10 text-cf-blue border-cf-blue/20" },
    { label: "ATCODER RED", color: "bg-lc-orange/10 text-lc-orange border-lc-orange/20" },
    { label: "LEETCODE KNIGHT", color: "bg-warning/10 text-warning border-warning/20" },
  ],
  platforms: [
    { name: "Codeforces", rating: "3842 (LGM)", pct: 98, color: "#38bdf8", sub: "Top 0.001% of all users" },
    { name: "AtCoder", rating: "4201 (Red)", pct: 95, color: "#ffb867", sub: "World Rank #2" },
    { name: "LeetCode", rating: "3124 / 3124", pct: 100, color: "#ffa116", sub: "All problems completed" },
  ],
};

const stats = [
  { label: "Global Rating", value: profile.rating, change: profile.ratingChange, highlight: true },
  { label: "World Rank", value: profile.worldRank, sub: "Global" },
  { label: "Total Solved", value: profile.totalSolved },
  { label: "Success Rate", value: profile.successRate },
];

const chartBars = [60, 65, 62, 70, 75, 80, 85, 82, 88, 92, 95, 100];
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function getHeatIntensity(i: number): string {
  const hash = (i * 2654435761) % 100;
  if (hash > 75) return "bg-brand";
  if (hash > 50) return "bg-brand/60";
  if (hash > 25) return "bg-brand/30";
  return "bg-surface-5";
}

export default async function ProfilePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-32 px-6 md:px-8 max-w-7xl mx-auto space-y-4">
        {/* Profile Header */}
        <section className="glass p-8 rounded-xl flex flex-col md:flex-row items-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand to-warning flex items-center justify-center text-brand-dark font-bold text-5xl shadow-xl">
              {handle.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-surface-6 border border-border p-1 rounded-full">
              <IconTrophy size={16} className="text-brand" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className="text-2xl font-semibold">{handle}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {profile.badges.map((b) => (
                  <span key={b.label} className={`px-2 py-0.5 rounded text-[10px] font-bold border ${b.color}`}>
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-text-secondary text-sm max-w-2xl">{profile.bio}</p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-text-muted text-xs">
              <span className="flex items-center gap-1"><IconMapPin size={14} /> {profile.location}</span>
              <span className="flex items-center gap-1"><IconLink size={14} /> {profile.github}</span>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className={`glass p-4 rounded-xl ${s.highlight ? "border-l-4 border-l-brand" : ""}`}>
              <div className="text-text-muted text-xs font-medium uppercase tracking-wider mb-2">{s.label}</div>
              <div className="flex items-baseline gap-2">
                <span className={`font-mono text-2xl ${s.highlight ? "text-brand" : ""}`}>{s.value}</span>
                {s.change && <span className="text-brand/60 font-mono text-xs">{s.change}</span>}
                {s.sub && <span className="text-text-muted font-mono text-xs">{s.sub}</span>}
              </div>
            </div>
          ))}
        </section>

        {/* Rating Chart + Heatmap */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8 glass p-4 rounded-xl min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2"><IconChartLine size={20} /> Rating Trajectory</h3>
              <div className="flex gap-2">
                <button className="bg-surface-7 px-3 py-1 rounded text-xs text-brand">1Y</button>
                <button className="px-3 py-1 rounded text-xs text-text-muted hover:bg-surface-5/50 transition-colors">ALL</button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 flex items-end gap-[2px]">
                {chartBars.map((h, i) => (
                  <div key={i} className="bg-brand-light/20 w-full border-t-2 border-brand-light" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="absolute bottom-0 w-full flex justify-between pt-2 border-t border-border text-text-muted font-mono text-[10px]">
                {months.map((m) => <span key={m}>{m}</span>)}
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-4">
            {/* Heatmap */}
            <div className="glass p-4 rounded-xl">
              <h3 className="text-xs font-medium text-text-muted uppercase mb-4">Submission Heatmap</h3>
              <div className="flex flex-wrap gap-1">
                {Array.from({ length: 98 }).map((_, i) => (
                  <div key={i} className={`w-[10px] h-[10px] rounded-sm ${getHeatIntensity(i)}`} />
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-text-muted text-[10px]">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-[10px] h-[10px] rounded-sm bg-surface-5" />
                  <div className="w-[10px] h-[10px] rounded-sm bg-brand/30" />
                  <div className="w-[10px] h-[10px] rounded-sm bg-brand/60" />
                  <div className="w-[10px] h-[10px] rounded-sm bg-brand" />
                </div>
                <span>More</span>
              </div>
            </div>

            {/* Achievement */}
            <div className="glass p-4 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-warning/20 flex items-center justify-center">
                <IconTrophy size={28} className="text-warning" />
              </div>
              <div>
                <div className="text-sm font-medium">1,000 Days Streak</div>
                <div className="text-[11px] text-text-muted">Achieved 2 days ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profile.platforms.map((p) => (
            <div key={p.name} className="glass p-4 rounded-xl group hover:border-brand/50 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-xs" style={{ color: p.color }}>{p.name}</span>
                <IconExternalLink size={16} className="text-text-muted group-hover:text-brand transition-colors" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center font-mono text-sm">
                  <span className="text-text-secondary">Rating</span>
                  <span>{p.rating}</span>
                </div>
                <div className="w-full h-1 bg-surface-7 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: p.color }} />
                </div>
                <div className="text-[10px] text-text-muted">{p.sub}</div>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden glass p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand/20 blur-[80px] rounded-full" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cf-blue/10 blur-[80px] rounded-full" />
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-2">Ready to track your growth?</h2>
            <p className="text-text-secondary text-sm">Join 50,000+ developers competing and improving their skills every day.</p>
          </div>
          <a href="/register" className="relative z-10 bg-brand text-brand-dark font-bold px-8 py-4 rounded-lg shadow-xl shadow-brand/20 hover:scale-105 transition-transform active:scale-95 text-sm">
            Track your own stats
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
