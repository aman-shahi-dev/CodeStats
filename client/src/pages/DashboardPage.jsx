import { PlatformCard } from "../components/dashboard/PlatformCard";
import { useStats } from "../hooks/useStats";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export function DashboardPage() {
  const {
    stats,
    isLoading,
    isRefreshing,
    error,
    lastFetchedAt,
    refresh,
    profile,
  } = useStats();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const hasUsernames =
    profile?.codeforcesUsername ||
    profile?.leetcodeUsername ||
    profile?.atcoderUsername;

  if (!hasUsernames) {
    return <div>please add your usernames to see stats</div>;
  }

  if (error) {
    return <div style={{ color: "var(--danger)" }}>{error.message}</div>;
  }

  return (
    <div>
      <PlatformCard
        platformName="Codeforces"
        color="var(--cf-color)"
        rating={stats?.cfRating}
        rank={stats?.cfRank}
        totalSolved={stats?.cfSolved}
        username={profile?.codeforcesUsername}
        // error={errors?.cf}
      />
    </div>
  );
}
