"use client";

import { useCfData } from "@/hooks/use-cf-data";
import { useMemo } from "react";

export function ActivityHeatmap() {
  const { data } = useCfData();
  const weeks = 52;
  const days = 7;

  // Process data into a map of date string -> count
  const dailyCounts = useMemo(() => {
    const counts = new Map<string, number>();
    
    if (data?.recentSubmissions) {
      data.recentSubmissions.forEach(sub => {
        // sub.createdAt is in seconds
        const date = new Date(sub.createdAt * 1000);
        // Format as YYYY-MM-DD
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        counts.set(dateStr, (counts.get(dateStr) || 0) + 1);
      });
    }
    return counts;
  }, [data]);

  // Determine starting date (364 days ago)
  const startDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - (weeks * days - 1)); // 363 days ago so today is included
    return d;
  }, []);

  const monthLabels = useMemo(() => {
    const labels: { label: string; colIndex: number }[] = [];
    let lastMonth = -1;
    for (let w = 0; w < weeks; w++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(startDate.getDate() + w * 7);
      const month = cellDate.getMonth();
      if (month !== lastMonth) {
        // Only add if there's enough space from the previous label (at least 3 columns)
        if (labels.length === 0 || w - labels[labels.length - 1].colIndex >= 3) {
          labels.push({ 
            label: cellDate.toLocaleDateString("en-US", { month: "short", year: "2-digit" }), 
            colIndex: w 
          });
        }
        lastMonth = month;
      }
    }
    return labels;
  }, [startDate, weeks]);

  function getIntensityForCell(w: number, d: number): string {
    const cellDate = new Date(startDate);
    cellDate.setDate(startDate.getDate() + (w * 7 + d));
    
    const dateStr = `${cellDate.getFullYear()}-${String(cellDate.getMonth() + 1).padStart(2, '0')}-${String(cellDate.getDate()).padStart(2, '0')}`;
    const count = dailyCounts.get(dateStr) || 0;

    if (count > 5) return "bg-brand";
    if (count > 2) return "bg-brand/60";
    if (count > 0) return "bg-brand/30";
    return "bg-surface-5/20";
  }

  return (
    <div className="glass-card p-4 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-medium text-text-primary uppercase">Activity Heatmap</h3>
        <span className="text-[10px] text-text-muted">Last 364 Days</span>
      </div>
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[700px]">
          {/* Month labels */}
          <div className="relative h-6 mb-1 text-[10px] text-text-muted">
            {monthLabels.map((l, i) => (
              <span 
                key={i} 
                className="absolute"
                style={{ left: `${l.colIndex * 16}px` }}
              >
                {l.label}
              </span>
            ))}
          </div>
          
          {/* Heatmap grid */}
          <div className="flex gap-1">
            {Array.from({ length: weeks }).map((_, w) => (
              <div key={w} className="flex flex-col gap-1">
                {Array.from({ length: days }).map((_, d) => {
                  const cellDate = new Date(startDate);
                  cellDate.setDate(startDate.getDate() + (w * 7 + d));
                  const dateStr = `${cellDate.getFullYear()}-${String(cellDate.getMonth() + 1).padStart(2, '0')}-${String(cellDate.getDate()).padStart(2, '0')}`;
                  const count = dailyCounts.get(dateStr) || 0;
                  
                  return (
                    <div 
                      key={d} 
                      className={`activity-cell ${getIntensityForCell(w, d)} hover:ring-1 hover:ring-white/50 transition-opacity hover:opacity-80 cursor-pointer`} 
                      title={`${count} submissions on ${cellDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-text-muted">
        <span>Less</span>
        <div className="activity-cell bg-surface-5/20" />
        <div className="activity-cell bg-brand/30" />
        <div className="activity-cell bg-brand/60" />
        <div className="activity-cell bg-brand" />
        <span>More</span>
      </div>
    </div>
  );
}
