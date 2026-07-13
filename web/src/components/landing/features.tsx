import { IconNetwork, IconCalendarStats, IconBrain } from "@tabler/icons-react";

const features = [
  {
    icon: IconNetwork, title: "Multi-Platform Stats",
    description: "Automatic synchronization with Codeforces, LeetCode, and AtCoder. One source of truth for your competitive profile.",
    tags: [{ label: "Real-time Sync", style: "bg-cf-blue/10 text-cf-blue" }, { label: "API-First", style: "bg-cf-blue/10 text-cf-blue" }],
  },
  {
    icon: IconCalendarStats, title: "Activity Heatmap",
    description: "Visualize your consistency across all platforms. Identify your peak performance windows and maintain your streak.",
    hasHeatmap: true,
  },
  {
    icon: IconBrain, title: "Weakness Detection",
    description: "Our AI analyzes your failed submissions and time-spent to suggest tags (DP, Graphs, SegTree) that need practice.",
    tags: [{ label: "Dynamic Programming", style: "bg-danger/10 text-danger" }, { label: "Graph Theory", style: "bg-brand/10 text-brand-light" }],
  },
];
export function Features() {
  return (
    <section className="px-6 md:px-8 max-w-7xl mx-auto py-20">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">Engineered for Focus</h2>
        <p className="text-text-secondary max-w-xl mx-auto">Eliminate manual tracking. Focus on what matters: solving problems and improving your rating.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((f) => (
          <div key={f.title} className="glass p-8 rounded-xl flex flex-col gap-4 group hover:border-brand/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center text-brand"><f.icon size={28} /></div>
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{f.description}</p>
            {f.hasHeatmap ? (
              <div className="mt-4 grid grid-cols-10 gap-1 opacity-40">
                {[100,60,20,80,40,100,30,70,10,50].map((o, i) => (
                  <div key={i} className="aspect-square rounded-sm" style={{ backgroundColor: `rgba(244,128,32,${o/100})` }} />
                ))}
              </div>
            ) : f.tags ? (
              <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
                {f.tags.map((t) => <span key={t.label} className={`px-2 py-1 rounded text-xs font-medium ${t.style}`}>{t.label}</span>)}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
