"use client";

import { useCfData } from "@/hooks/use-cf-data";
import { useMemo } from "react";

export function ContestTimeline() {
  const { data } = useCfData();

  const timelineData = useMemo(() => {
    if (!data?.ratingHistory || data.ratingHistory.length === 0) {
      return [];
    }

    // Sort by timestamp descending (newest first)
    const sorted = [...data.ratingHistory].sort((a, b) => b.timestamp - a.timestamp);
    
    // Take top 10
    const recent = sorted.slice(0, 10);

    return recent.map((r) => {
      const change = r.rating - r.oldRating;
      const isPositive = change >= 0;
      
      return {
        name: r.contest,
        date: r.date,
        rank: `#${r.rank.toLocaleString()}`,
        change: isPositive ? `+${change}` : `${change}`,
        color: isPositive ? "bg-brand" : "bg-danger",
        textColor: isPositive ? "text-brand" : "text-danger",
      };
    });
  }, [data]);

  return (
    <div className="glass-card p-4 rounded-lg mb-4">
      <h3 className="text-xs font-medium uppercase mb-8">Contest History Timeline</h3>
      
      {timelineData.length === 0 ? (
        <div className="text-center text-text-muted text-xs py-8">
          No contest history available.
        </div>
      ) : (
        <div className="relative flex flex-col gap-8 ml-4 border-l border-border pb-4">
          {timelineData.map((c) => (
            <div key={c.name} className="relative pl-8">
              <div className={`absolute left-[-5px] top-1 w-[9px] h-[9px] rounded-full ${c.color}`} />
              <div className="flex justify-between items-start">
                <div className="max-w-[70%]">
                  <p className="text-sm font-medium truncate" title={c.name}>{c.name}</p>
                  <p className="text-[10px] text-text-muted">{c.date} • Ranked {c.rank}</p>
                </div>
                <div className="text-right">
                  <span className={`font-bold ${c.textColor}`}>{c.change}</span>
                  <p className="text-[8px] uppercase text-text-muted">Rating Change</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
