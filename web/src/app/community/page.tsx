import { Navbar, Footer } from "@/components/layout";
import { IconBrandDiscord, IconBrandGithub, IconBrandX, IconUsers, IconCode, IconTrophy } from "@tabler/icons-react";

const communityStats = [
  { label: "Active Members", value: "2,400+", icon: IconUsers },
  { label: "Open Source Contributions", value: "180+", icon: IconCode },
  { label: "Contests Tracked", value: "12,000+", icon: IconTrophy },
];

const channels = [
  { name: "Discord Server", description: "Join real-time discussions, get help, share strategies, and connect with fellow competitive programmers.", icon: IconBrandDiscord, color: "text-[#5865F2]", bg: "bg-[#5865F2]/10", cta: "Join Discord", href: "#" },
  { name: "GitHub", description: "CodeStats is open-source. Contribute features, report bugs, or build integrations with our public API.", icon: IconBrandGithub, color: "text-text-primary", bg: "bg-surface-5", cta: "View Repo", href: "#" },
  { name: "X (Twitter)", description: "Follow us for contest reminders, feature updates, competitive programming tips, and community highlights.", icon: IconBrandX, color: "text-text-primary", bg: "bg-surface-5", cta: "Follow Us", href: "#" },
];

const topUsers = [
  { handle: "tourist", rating: "3842", rank: "#1", platform: "CF" },
  { handle: "jiangly", rating: "3601", rank: "#2", platform: "CF" },
  { handle: "Benq", rating: "3452", rank: "#3", platform: "CF" },
  { handle: "ecnerwala", rating: "3400", rank: "#4", platform: "CF" },
  { handle: "ksun48", rating: "3350", rank: "#5", platform: "CF" },
];

export const metadata = { title: "Community" };

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Join the <span className="text-gradient">community</span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Connect with competitive programmers worldwide. Share strategies, celebrate wins, and grow together.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {communityStats.map((s) => (
            <div key={s.label} className="glass p-6 rounded-xl text-center">
              <s.icon size={32} className="text-brand mx-auto mb-3" />
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {channels.map((c) => (
            <div key={c.name} className="glass p-6 rounded-xl flex flex-col group hover:border-brand/50 transition-colors">
              <div className={`w-12 h-12 rounded-lg ${c.bg} flex items-center justify-center ${c.color} mb-4`}>
                <c.icon size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{c.name}</h3>
              <p className="text-text-secondary text-sm flex-1 mb-6">{c.description}</p>
              <a href={c.href} className="text-center py-2.5 rounded-md border border-border text-sm font-medium hover:bg-surface-5/30 transition-colors">
                {c.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Leaderboard Preview */}
        <div className="glass rounded-xl overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="text-lg font-semibold">Global Leaderboard</h3>
            <span className="text-[10px] text-text-muted uppercase tracking-widest">Top 5 this month</span>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-surface-7/50 text-text-muted text-[11px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Rank</th>
                <th className="px-6 py-3 text-left">Handle</th>
                <th className="px-6 py-3 text-left">Platform</th>
                <th className="px-6 py-3 text-right">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {topUsers.map((u) => (
                <tr key={u.handle} className="hover:bg-surface-5/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-brand">{u.rank}</td>
                  <td className="px-6 py-4 font-medium">{u.handle}</td>
                  <td className="px-6 py-4 text-text-muted">{u.platform}</td>
                  <td className="px-6 py-4 font-mono text-right">{u.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
}
