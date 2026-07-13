"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useCfData } from "@/hooks/use-cf-data";
import { useMemo } from "react";

export function DifficultyChart() {
  const { data } = useCfData();

  const chartData = useMemo(() => {
    if (!data?.recentSubmissions) {
      return [
        { name: "Easy", value: 0, color: "#4ade80" },
        { name: "Medium", value: 0, color: "#f48020" },
        { name: "Hard", value: 0, color: "#38bdf8" },
      ];
    }

    const solvedProblems = new Map<string, number>();

    // Get unique accepted problems and their ratings
    data.recentSubmissions.forEach((s) => {
      if (s.verdict === "OK" && s.rating !== undefined) {
        if (!solvedProblems.has(s.problem)) {
          solvedProblems.set(s.problem, s.rating);
        }
      }
    });

    let easy = 0;
    let medium = 0;
    let hard = 0;

    solvedProblems.forEach((rating) => {
      if (rating < 1200) easy++;
      else if (rating < 1600) medium++;
      else hard++;
    });

    return [
      { name: "Easy", value: easy, color: "#4ade80" },
      { name: "Medium", value: medium, color: "#f48020" },
      { name: "Hard", value: hard, color: "#38bdf8" },
    ];
  }, [data]);

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="glass-card p-4 rounded-lg">
      <h3 className="text-xs font-medium text-text-primary uppercase mb-6">Difficulty Split</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={45} outerRadius={60} dataKey="value" strokeWidth={0}>
              {chartData.map((d) => <Cell key={d.name} fill={d.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center -mt-4 mb-4">
        <span className="text-xl font-semibold">{total}</span>
        <p className="text-[10px] text-text-muted">TOTAL (Rated)</p>
      </div>
      <div className="space-y-3">
        {chartData.map((d) => (
          <div key={d.name} className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
              {d.name}
            </div>
            <span className="font-mono">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
