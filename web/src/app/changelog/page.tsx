import { Navbar, Footer } from "@/components/layout";

const entries = [
  { version: "v2.0.0", date: "July 2026", tag: "Latest", tagColor: "bg-brand text-brand-dark", changes: ["New analytics engine with cross-platform tracking", "AI-powered weakness detection", "Redesigned dashboard with glassmorphism UI", "Public profile pages with shareable links"] },
  { version: "v1.5.0", date: "May 2026", tag: "Stable", tagColor: "bg-green-500/10 text-green-400", changes: ["Added AtCoder integration", "Activity heatmap component", "Contest reminder email notifications"] },
  { version: "v1.0.0", date: "March 2026", tag: "", tagColor: "", changes: ["Initial launch with Codeforces support", "Basic rating tracking and submission history", "OAuth with Google and GitHub"] },
];

export const metadata = { title: "Changelog" };

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 md:px-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Changelog</h1>
        <p className="text-text-secondary mb-12">Track every update and improvement to CodeStats.</p>

        <div className="relative border-l border-border ml-4 space-y-12">
          {entries.map((e) => (
            <div key={e.version} className="relative pl-8">
              <div className="absolute left-[-5px] top-1.5 w-[9px] h-[9px] rounded-full bg-brand" />
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-lg font-semibold">{e.version}</h2>
                {e.tag && <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${e.tagColor}`}>{e.tag}</span>}
                <span className="text-xs text-text-muted">{e.date}</span>
              </div>
              <ul className="space-y-2">
                {e.changes.map((c) => (
                  <li key={c} className="text-sm text-text-secondary flex items-start gap-2">
                    <span className="text-brand mt-1">•</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
