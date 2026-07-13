"use client";

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { useCfData } from "@/hooks/use-cf-data";
import { useMemo } from "react";

export function TopicRadar() {
  const { data } = useCfData();

  const chartData = useMemo(() => {
    if (!data?.recentSubmissions) {
      return [
        { topic: "DP", score: 85 },
        { topic: "Graphs", score: 70 },
        { topic: "Greedy", score: 90 },
        { topic: "Trees", score: 60 },
        { topic: "Math", score: 75 },
        { topic: "Strings", score: 80 },
      ];
    }

    const tagCounts = new Map<string, number>();

    // Count tags for accepted problems (unique problems only)
    const solvedProblems = new Set<string>();
    
    data.recentSubmissions.forEach((s) => {
      if (s.verdict === "OK" && !solvedProblems.has(s.problem)) {
        solvedProblems.add(s.problem);
        s.tags?.forEach((tag) => {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        });
      }
    });

    if (tagCounts.size === 0) {
       return [
        { topic: "No Data", score: 0 },
      ];
    }

    // Sort tags by count
    const sortedTags = Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    const maxCount = sortedTags[0][1] || 1;

    return sortedTags.map(([topic, count]) => ({
      // capitalize first letter for display
      topic: topic.charAt(0).toUpperCase() + topic.slice(1),
      score: Math.round((count / maxCount) * 100),
    }));
  }, [data]);

  return (
    <div className="glass-card p-4 rounded-lg">
      <h3 className="text-xs font-medium text-text-primary uppercase mb-6">Topic Proficiency</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData}>
            <PolarGrid stroke="#292524" />
            <PolarAngleAxis dataKey="topic" tick={{ fill: "#a58c7d", fontSize: 9 }} />
            <Radar dataKey="score" stroke="#f48020" fill="#f48020" fillOpacity={0.3} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
