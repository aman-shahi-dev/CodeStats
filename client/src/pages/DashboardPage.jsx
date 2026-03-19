import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { useStats } from "../hooks/useStats";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export function DashboardPage() {
  const { user } = useAuth();
  const { profile, isLoading: profileLoading } = useProfile();
  const {
    stats,
    totalSolved,
    isLoading: statsLoading,
    isRefreshing,
    errors,
    lastFetchedAt,
    refresh,
  } = useStats();

  const isLoading = profileLoading || statsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const hasNoUsernames =
    !profile?.codeforcesUsername &&
    !profile?.leetcodeUsername &&
    !profile?.atcoderUsername;

  if (hasNoUsernames) {
    return (
      <div className="page-container flex flex-col items-center justify-center min-h-[70vh] text-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-2"
          style={{
            background: "color-mix(in srgb, var(--brand) 12%, transparent)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="var(--brand)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h2
          className="text-xl font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Link your accounts to get started
        </h2>
        <p
          className="text-sm max-w-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          Add your Codeforces, LeetCode, or AtCoder usernames in settings to see
          your stats here.
        </p>
        <Link to="/settings" className="btn-primary px-5 py-2.5 text-sm mt-2">
          Go to Settings
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container flex flex-col gap-4">
      {/* ── Topbar ── */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h1
            className="text-xl font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Dashboard
          </h1>
          <p
            className="text-xs font-mono"
            style={{ color: "var(--text-tertiary)" }}
          >
            {[
              profile?.codeforcesUsername,
              profile?.leetcodeUsername,
              profile?.atcoderUsername,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastFetchedAt && (
            <span
              className="text-xs hidden sm:block"
              style={{ color: "var(--text-tertiary)" }}
            >
              Updated {formatRelativeTime(lastFetchedAt)}
            </span>
          )}
          <button
            onClick={refresh}
            disabled={isRefreshing}
            className="btn-secondary px-3 py-2 text-xs flex items-center gap-1.5"
          >
            {isRefreshing ? (
              <LoadingSpinner size="sm" />
            ) : (
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13.5 8A5.5 5.5 0 112.5 5M2.5 2v3h3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {isRefreshing ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>

      {/* ── Top stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <PlatformCard
          platform="Codeforces"
          color="var(--cf-color)"
          rating={stats?.cfRating}
          rank={stats?.cfRank}
          solved={stats?.cfSolved}
          username={profile?.codeforcesUsername}
          error={errors?.cf}
        />
        <PlatformCard
          platform="LeetCode"
          color="var(--lc-color)"
          rating={stats?.lcGlobalRank} // Using global rank as primary display
          rank="Global Rank"
          solved={stats?.lcSolved}
          username={profile?.leetcodeUsername}
          error={errors?.lc}
          extra={
            stats?.lcEasy != null
              ? `${stats.lcEasy}E · ${stats.lcMedium}M · ${stats.lcHard}H`
              : null
          }
        />
        <PlatformCard
          platform="AtCoder"
          color="var(--ac-color)"
          rating={stats?.acRating}
          rank={stats?.acRank}
          solved={stats?.acSolved}
          username={profile?.atcoderUsername}
          error={errors?.ac}
        />
        <CombinedCard
          totalSolved={totalSolved}
          cfRating={stats?.cfRating}
          lcRating={stats?.lcGlobalRank}
          acRating={stats?.acRating}
        />
      </div>

      {/* ── Bottom row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Heatmap */}
        <div className="surface p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-xs font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Activity — all platforms
            </span>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              past 6 months
            </span>
          </div>
          {/* <Heatmap />*/}
        </div>

        {/* Recent contests */}
        <div className="surface p-5">
          <span
            className="text-xs font-medium block mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            Recent contests
          </span>
          <RecentContests profile={profile} stats={stats} />
        </div>
      </div>
    </div>
  );
}

/* ── PlatformCard ── */
function PlatformCard({
  platform,
  color,
  rating,
  rank,
  solved,
  username,
  error,
  extra,
}) {
  const notLinked = !username;
  // If platform is LeetCode, we don't treat rating==null as "loading" because
  // we might not have a contest rating, but we do have Global Rank.
  const isLoading =
    !notLinked && !error && rating == null && platform !== "LeetCode";

  return (
    <div className="surface p-4">
      <div
        className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider mb-3"
        style={{ color }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: color }}
        />
        {platform}
      </div>

      {notLinked ? (
        <div className="flex flex-col gap-1">
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            Not linked
          </p>
          <Link
            to="/settings"
            className="text-xs"
            style={{ color: "var(--brand)" }}
          >
            Add username →
          </Link>
        </div>
      ) : error ? (
        <p className="text-xs" style={{ color: "var(--danger)" }}>
          Failed to fetch
        </p>
      ) : isLoading ? (
        <div className="skeleton h-8 w-20 mb-2" />
      ) : (
        <>
          <div
            className="text-2xl font-semibold font-mono leading-none mb-1.5"
            style={{ color }}
          >
            {rating ? rating.toLocaleString() : "—"}
          </div>
          {rank && (
            <div
              className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mb-2 capitalize"
              style={{
                background: `color-mix(in srgb, ${color} 12%, transparent)`,
                color,
              }}
            >
              {rank}
            </div>
          )}
          {solved != null && (
            <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              Solved{" "}
              <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
                {solved.toLocaleString()}
              </span>
            </div>
          )}
          {extra && (
            <div
              className="text-[11px] mt-1 font-mono"
              style={{ color: "var(--text-tertiary)" }}
            >
              {extra}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ── CombinedCard ── */
function CombinedCard({ totalSolved, cfRating, lcRating, acRating }) {
  return (
    <div className="surface p-4">
      <div
        className="text-[11px] font-medium uppercase tracking-wider mb-3"
        style={{ color: "var(--text-tertiary)" }}
      >
        Combined
      </div>
      <div
        className="text-2xl font-semibold font-mono leading-none mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        {totalSolved.toLocaleString()}
      </div>
      <div className="text-xs mb-3" style={{ color: "var(--text-tertiary)" }}>
        problems solved
      </div>
      <div className="flex flex-col gap-1.5">
        {[
          { label: "CF rating", val: cfRating, color: "var(--cf-color)" },
          { label: "LC rank", val: lcRating, color: "var(--lc-color)" },
          { label: "AC rating", val: acRating, color: "var(--ac-color)" },
        ].map(({ label, val, color }) => (
          <div
            key={label}
            className="flex items-center justify-between text-xs"
          >
            <span style={{ color: "var(--text-tertiary)" }}>{label}</span>
            <span className="font-mono font-medium" style={{ color }}>
              {val != null ? val.toLocaleString() : "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Heatmap (Visual Logic) ── */
function Heatmap() {
  const weeks = 26;
  const days = 7;
  const colors = [
    "var(--bg-raised)",
    "var(--cf-color)",
    "var(--lc-color)",
    "var(--ac-color)",
  ];
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

  const cells = Array.from({ length: days }, (_, d) =>
    Array.from({ length: weeks }, (_, w) => {
      const r = Math.random();
      if (r < 0.5) return 0;
      return Math.floor(Math.random() * 3) + 1;
    })
  );

  return (
    <div>
      <div className="flex mb-1.5">
        {months.map((m) => (
          <span
            key={m}
            className="flex-1 text-[10px]"
            style={{ color: "var(--text-tertiary)" }}
          >
            {m}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {cells.map((row, d) => (
          <div key={d} className="flex gap-1">
            {row.map((lvl, w) => (
              <div
                key={w}
                className="rounded-sm flex-1"
                style={{
                  height: "10px",
                  background:
                    lvl === 0
                      ? "var(--bg-raised)"
                      : `color-mix(in srgb, ${colors[lvl]} 60%, transparent)`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3">
        {[
          { color: "var(--cf-color)", label: "Codeforces" },
          { color: "var(--lc-color)", label: "LeetCode" },
          { color: "var(--ac-color)", label: "AtCoder" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-sm"
              style={{ background: color }}
            />
            <span
              className="text-[10px]"
              style={{ color: "var(--text-tertiary)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── RecentContests ── */
function RecentContests({ profile, stats }) {
  const contests = stats?.cfContests || [];

  if (contests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
          No recent contest data available.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {contests.map((c, i) => (
        <div
          key={i}
          className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0"
        >
          <div className="flex flex-col truncate pr-2">
            <span
              className="text-xs font-medium truncate"
              style={{ color: "var(--text-secondary)" }}
            >
              {c.name}
            </span>
            <span
              className="text-[10px]"
              style={{ color: "var(--text-tertiary)" }}
            >
              {new Date(c.date).toLocaleDateString()}
            </span>
          </div>
          <div
            className={`text-xs font-mono font-bold ${c.delta >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {c.delta >= 0 ? `+${c.delta}` : c.delta}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Helpers ── */
function formatRelativeTime(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
