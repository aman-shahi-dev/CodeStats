"use client";

import { useCfData } from "@/hooks/use-cf-data";
import { useMemo } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";
import { IconTrendingUp, IconTrendingDown, IconTrophy, IconTarget, IconFlame, IconCalendar, IconLoader2 } from "@tabler/icons-react";

export default function AnalyticsPage() {
  const { data, loading, error } = useCfData();

  const analytics = useMemo(() => {
    if (!data) return null;

    const accepted = data.recentSubmissions?.filter((s) => s.verdict === "OK") || [];
    const now = Date.now();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;

    // 1. KPIs
    let thisMonth = 0;
    let lastMonth = 0;
    let maxRating = 0;
    
    // Daily counts for streak
    const dailyCounts = new Map<string, number>();

    accepted.forEach((s) => {
      const ms = s.createdAt * 1000;
      if (now - ms <= thirtyDays) thisMonth++;
      else if (now - ms <= 2 * thirtyDays) lastMonth++;

      if (s.rating && s.rating > maxRating) maxRating = s.rating;

      const date = new Date(ms);
      const dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      dailyCounts.set(dateStr, (dailyCounts.get(dateStr) || 0) + 1);
    });

    // Calculate streak
    let streak = 0;
    const d = new Date();
    // Start checking from today, if 0, check yesterday
    const todayStr = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    d.setDate(d.getDate() - 1);
    const yesterdayStr = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

    let currentDate = new Date();
    if (!dailyCounts.has(todayStr) && dailyCounts.has(yesterdayStr)) {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    while (true) {
      const str = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
      if (dailyCounts.has(str)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    const monthChange = lastMonth === 0 ? 100 : Math.round(((thisMonth - lastMonth) / lastMonth) * 100);

    const kpiCards = [
      { label: "Problems This Month", value: thisMonth.toString(), change: `${monthChange >= 0 ? "+" : ""}${monthChange}%`, up: monthChange >= 0, icon: IconTarget },
      { label: "Max Rating Solved", value: maxRating > 0 ? maxRating.toString() : "—", change: "All time", up: null, icon: IconTrophy },
      { label: "Current Streak", value: `${streak}d`, change: streak > 0 ? "Keep it up!" : "Start today!", up: streak > 0, icon: IconFlame },
      { label: "Contests Attended", value: (data.ratingHistory?.length || 0).toString(), change: "Total", up: null, icon: IconCalendar },
    ];

    // 2. Rating Trends
    const ratingData = [...(data.ratingHistory || [])]
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((r) => ({
        date: r.date,
        cf: r.rating,
      }));

    // 3. Solved By Day
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysArr = new Array(7).fill(0).map((_, i) => ({ day: dayNames[i], count: 0 }));
    
    accepted.forEach((s) => {
      const dayIndex = new Date(s.createdAt * 1000).getDay();
      daysArr[dayIndex].count++;
    });
    // Shift array so Monday is first
    const solvedByDay = [...daysArr.slice(1), daysArr[0]];

    let maxDayCount = 0;
    let mostProductiveDay = "—";
    solvedByDay.forEach(d => {
      if (d.count > maxDayCount) {
        maxDayCount = d.count;
        mostProductiveDay = d.day;
      }
    });

    // 4. Verdict Breakdown
    const verdictMap = new Map<string, number>();
    const colors = {
      "OK": "#4ade80",
      "WRONG_ANSWER": "#f87171",
      "TIME_LIMIT_EXCEEDED": "#fbbf24",
      "RUNTIME_ERROR": "#38bdf8",
      "COMPILATION_ERROR": "#a78bfa",
    };
    
    data.recentSubmissions?.forEach(s => {
      verdictMap.set(s.verdict, (verdictMap.get(s.verdict) || 0) + 1);
    });

    const verdictData = Array.from(verdictMap.entries()).map(([v, count]) => {
      const name = v === "OK" ? "Accepted" 
                 : v === "WRONG_ANSWER" ? "Wrong Answer"
                 : v === "TIME_LIMIT_EXCEEDED" ? "TLE"
                 : v === "RUNTIME_ERROR" ? "Runtime Error"
                 : v === "COMPILATION_ERROR" ? "Compilation Error"
                 : "Other";
      return {
        name,
        value: count,
        color: (colors as any)[v] || "#a58c7d",
      };
    }).sort((a, b) => b.value - a.value);

    // 5. Tag Breakdown
    const tagMap = new Map<string, number>();
    const solvedSet = new Set<string>(); // unique problems only
    
    accepted.forEach((s) => {
      if (!solvedSet.has(s.problem)) {
        solvedSet.add(s.problem);
        s.tags?.forEach(tag => {
          tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
        });
      }
    });

    const topTags = Array.from(tagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, value], i) => {
        const tagColors = ["#f48020", "#38bdf8", "#4ade80", "#fbbf24", "#f87171", "#a78bfa"];
        return {
          name: name.charAt(0).toUpperCase() + name.slice(1),
          value,
          color: tagColors[i % tagColors.length],
        };
      });

    const maxTagValue = topTags.length > 0 ? topTags[0].value : 1;

    return { kpiCards, ratingData, solvedByDay, verdictData, topTags, maxTagValue, mostProductiveDay };
  }, [data]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
        <IconLoader2 size={32} className="text-brand animate-spin mb-4" />
        <p className="text-text-muted text-sm">Analyzing your stats...</p>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-danger mb-2">Error loading analytics</p>
        <p className="text-text-muted text-sm">{error || "No data available"}</p>
      </div>
    );
  }

  const { kpiCards, ratingData, solvedByDay, verdictData, topTags, maxTagValue, mostProductiveDay } = analytics;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Analytics</h1>
        <p className="text-sm text-text-secondary">Deep dive into your competitive programming performance.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {kpiCards.map((k) => (
          <div key={k.label} className="glass-card p-5 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <p className="text-xs font-medium text-text-muted uppercase">{k.label}</p>
              <k.icon size={18} className="text-brand" />
            </div>
            <h2 className="text-2xl font-semibold">{k.value}</h2>
            <div className="flex items-center gap-1 mt-2">
              {k.up !== null && (k.up ? <IconTrendingUp size={14} className="text-green-400" /> : <IconTrendingDown size={14} className="text-danger" />)}
              <span className={`text-xs font-mono ${k.up ? "text-green-400" : (k.up === false ? "text-danger" : "text-text-muted")}`}>{k.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Cross-Platform Rating Trends */}
      <div className="glass-card p-4 rounded-lg mb-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-medium uppercase">Codeforces Rating Trend</h3>
          <div className="flex gap-4 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand" /> Codeforces</span>
          </div>
        </div>
        <div className="h-72">
          {ratingData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ratingData}>
                <defs>
                  <linearGradient id="cfGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f48020" stopOpacity={0.2} /><stop offset="100%" stopColor="#f48020" stopOpacity={0} /></linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fill: "#a58c7d", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
                <Tooltip contentStyle={{ background: "#1c1917", border: "1px solid #292524", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="cf" name="Rating" stroke="#f48020" fill="url(#cfGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted text-sm">
              No rating history available yet. Participate in contests!
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Solved by Day */}
        <div className="glass-card p-4 rounded-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xs font-medium uppercase text-text-primary">Problems Solved by Day</h3>
              {mostProductiveDay !== "—" && (
                <p className="text-[10px] text-text-muted mt-1">
                  Most productive: <strong className="text-brand font-medium">{mostProductiveDay}</strong>
                </p>
              )}
            </div>
            <span className="text-[10px] text-text-muted">All-time Aggregate</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={solvedByDay}>
                <XAxis dataKey="day" tick={{ fill: "#a58c7d", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "#1c1917", border: "1px solid #292524", borderRadius: 8, fontSize: 12 }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar dataKey="count" name="Solved" fill="#f48020" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Verdict Breakdown */}
        <div className="glass-card p-4 rounded-lg">
          <h3 className="text-xs font-medium uppercase mb-6">Verdict Breakdown</h3>
          <div className="flex items-center gap-6">
            <div className="h-48 w-48">
              {verdictData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={verdictData} cx="50%" cy="50%" innerRadius={40} outerRadius={55} dataKey="value" strokeWidth={0}>
                      {verdictData.map((d) => <Cell key={d.name} fill={d.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#1c1917", border: "1px solid #292524", borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">No data</div>
              )}
            </div>
            <div className="flex-1 space-y-3">
              {verdictData.slice(0, 5).map((d) => (
                <div key={d.name} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="truncate">{d.name}</span>
                  </div>
                  <span className="font-mono flex-shrink-0">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tag Breakdown */}
      <div className="glass-card p-4 rounded-lg mb-4">
        <h3 className="text-xs font-medium uppercase mb-6">Problems by Topic Tag</h3>
        <div className="space-y-4">
          {topTags.length > 0 ? topTags.map((t) => (
            <div key={t.name} className="flex items-center gap-4">
              <span className="text-xs text-text-secondary w-20 truncate">{t.name}</span>
              <div className="flex-1 h-2 bg-surface-5 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${(t.value / maxTagValue) * 100}%`, background: t.color }} />
              </div>
              <span className="text-xs font-mono w-8 text-right">{t.value}</span>
            </div>
          )) : (
            <p className="text-sm text-text-muted text-center py-4">No topic data available</p>
          )}
        </div>
      </div>
    </>
  );
}
