"use client";

import { IconTrendingUp, IconTrophy, IconPuzzle, IconFlame, IconLoader2 } from "@tabler/icons-react";
import { useCfData } from "@/hooks/use-cf-data";

function getRankColor(rank: string): string {
  if (rank.includes("legendary")) return "text-red-400";
  if (rank.includes("international")) return "text-red-400";
  if (rank.includes("grandmaster")) return "text-red-400";
  if (rank.includes("master")) return "text-orange-400";
  if (rank.includes("candidate")) return "text-purple-400";
  if (rank.includes("expert")) return "text-cf-blue";
  if (rank.includes("specialist")) return "text-cyan-400";
  if (rank.includes("pupil")) return "text-green-400";
  return "text-text-muted";
}

export function StatsCards() {
  const { data, loading, error } = useCfData();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-5 rounded-lg animate-pulse">
            <div className="h-3 bg-surface-7 rounded w-24 mb-4" />
            <div className="h-8 bg-surface-7 rounded w-16 mb-3" />
            <div className="h-2 bg-surface-7 rounded w-32" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-5 rounded-lg mb-4 border-l-4 border-l-warning">
        <p className="text-warning text-sm font-medium">⚠ {error}</p>
        <p className="text-text-muted text-xs mt-1">
          Go to{" "}
          <a href="/dashboard/settings" className="text-brand underline">
            Settings
          </a>{" "}
          to add your Codeforces handle.
        </p>
      </div>
    );
  }

  const rankColor = getRankColor(data?.rank || "");

  const stats = [
    {
      label: "Current Rating",
      value: data?.rating?.toString() || "—",
      sub: `Peak: ${data?.maxRating || "—"}`,
      icon: IconTrendingUp,
    },
    {
      label: "Current Rank",
      value: data?.rank || "—",
      sub: `Max: ${data?.maxRank || "—"}`,
      icon: IconTrophy,
      highlight: rankColor,
    },
    {
      label: "Solved (Recent)",
      value: data?.solvedCount?.toString() || "—",
      sub: `From last ${data?.recentSubmissions?.length || 0} submissions`,
      icon: IconPuzzle,
    },
    {
      label: "Codeforces Handle",
      value: data?.handle || "—",
      sub: `${data?.rating || 0} rated`,
      icon: IconFlame,
      highlight: "text-brand",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`glass-card p-5 rounded-lg ${
            s.highlight === "text-brand" ? "border-l-4 border-l-brand" : ""
          }`}
        >
          <p className="text-xs font-medium text-text-muted uppercase mb-2">
            {s.label}
          </p>
          <div className="flex items-end gap-2">
            <h2 className={`text-2xl font-semibold capitalize ${s.highlight || ""}`}>
              {s.value}
            </h2>
          </div>
          <p className="text-[10px] text-text-muted mt-3">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}
