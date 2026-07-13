"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useCfData } from "@/hooks/use-cf-data";

export function RatingChart() {
  const { data, loading } = useCfData();

  if (loading) {
    return (
      <div className="glass-card p-4 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="h-3 bg-surface-7 rounded w-32 animate-pulse" />
        </div>
        <div className="h-64 bg-surface-7/30 rounded animate-pulse" />
      </div>
    );
  }

  const chartData = data?.ratingHistory || [];

  return (
    <div className="glass-card p-4 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-medium text-text-primary uppercase">
          Rating History
        </h3>
        <span className="bg-brand/10 text-brand px-2 py-1 rounded text-[10px] font-bold">
          LAST 12 CONTESTS
        </span>
      </div>
      {chartData.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-text-muted text-sm">
          No contest history yet
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="ratingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f48020" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#f48020" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tick={{ fill: "#a58c7d", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                hide
                domain={["dataMin - 50", "dataMax + 50"]}
              />
              <Tooltip
                contentStyle={{
                  background: "#1c1917",
                  border: "1px solid #292524",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "#a58c7d" }}
                itemStyle={{ color: "#f48020" }}
              />
              <Area
                type="monotone"
                dataKey="rating"
                stroke="#f48020"
                strokeWidth={2}
                fill="url(#ratingGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
