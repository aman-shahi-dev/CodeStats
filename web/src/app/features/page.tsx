import { Navbar, Footer } from "@/components/layout";
import { IconTerminal, IconCode, IconTrophy, IconChefHat, IconArrowRight } from "@tabler/icons-react";

const platforms = [
  {
    name: "Codeforces",
    icon: IconTerminal,
    color: "text-cf-blue",
    bg: "bg-cf-blue/10",
    border: "border-cf-blue/30",
    status: "Live",
    description: "Full integration with the Codeforces API. Track your rating, submissions, contest history, and problem-solving patterns in real-time.",
    features: ["Rating history tracking", "Contest performance analysis", "Submission verdict breakdown", "Problem tag proficiency", "Virtual contest support"],
  },
  {
    name: "LeetCode",
    icon: IconCode,
    color: "text-lc-orange",
    bg: "bg-lc-orange/10",
    border: "border-lc-orange/30",
    status: "Coming Soon",
    description: "Connect your LeetCode profile to track daily challenges, contest ratings, and difficulty progression across all problem categories.",
    features: ["Daily challenge streak", "Contest rating graph", "Difficulty split analytics", "Company-tagged progress", "Study plan tracking"],
  },
  {
    name: "AtCoder",
    icon: IconTrophy,
    color: "text-ac-teal",
    bg: "bg-ac-teal/10",
    border: "border-ac-teal/30",
    status: "Coming Soon",
    description: "Sync your AtCoder stats including ABC/ARC/AGC performance, rating changes, and problem-solving speed metrics.",
    features: ["Contest type breakdown", "Rating color progression", "Performance rating tracking", "Speed benchmarking", "Historical comparisons"],
  },
  {
    name: "CodeChef",
    icon: IconChefHat,
    color: "text-cc-brown",
    bg: "bg-cc-brown/10",
    border: "border-cc-brown/30",
    status: "Planned",
    description: "Track your CodeChef long challenges, cook-offs, and lunch time performance with detailed analytics.",
    features: ["Division tracking", "Long challenge analysis", "Cook-off performance", "Problem difficulty curve", "Peer comparison"],
  },
];

export const metadata = { title: "Platforms" };

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            All your <span className="text-gradient">platforms</span>, one dashboard
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Connect your competitive programming profiles and get unified analytics across every platform you use.
          </p>
        </div>

        <div className="space-y-6">
          {platforms.map((p) => (
            <div key={p.name} className={`glass p-8 rounded-xl border ${p.border} hover:border-brand/50 transition-colors`}>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg ${p.bg} flex items-center justify-center ${p.color}`}>
                      <p.icon size={28} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{p.name}</h2>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        p.status === "Live"
                          ? "bg-green-500/10 text-green-400"
                          : p.status === "Coming Soon"
                          ? "bg-warning/10 text-warning"
                          : "bg-surface-5 text-text-muted"
                      }`}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">{p.description}</p>
                  {p.status === "Live" && (
                    <a href="/register" className="inline-flex items-center gap-2 text-brand text-sm font-medium hover:underline underline-offset-4">
                      Connect now <IconArrowRight size={16} />
                    </a>
                  )}
                </div>
                <div className="md:w-64">
                  <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">Features</h4>
                  <ul className="space-y-2">
                    {p.features.map((f) => (
                      <li key={f} className="text-sm text-text-secondary flex items-start gap-2">
                        <span className={`mt-1 ${p.color}`}>•</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
