import { HeaderActions } from "@/components/dashboard/header-actions";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RatingChart } from "@/components/dashboard/rating-chart";
import { DifficultyChart } from "@/components/dashboard/difficulty-chart";
import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap";
import { TopicRadar } from "@/components/dashboard/topic-radar";
import { RecentSubmissions } from "@/components/dashboard/recent-submissions";
import { ContestTimeline } from "@/components/dashboard/contest-timeline";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">System Overview</h1>
        <div className="flex gap-3">
          <HeaderActions />
        </div>
      </header>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2"><RatingChart /></div>
        <DifficultyChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2"><ActivityHeatmap /></div>
        <TopicRadar />
      </div>

      <RecentSubmissions />
      <ContestTimeline />
    </>
  );
}
