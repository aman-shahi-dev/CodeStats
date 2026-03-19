import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { statsService } from "../services/stats/statsService";
import { profileService } from "../services/appwrite/profileService";

const TTL_MINUTES = 30;

function isStale(lastFetchedAt) {
  if (!lastFetchedAt) return true;
  const last = new Date(lastFetchedAt).getTime();
  const now = Date.now();
  return now - last > TTL_MINUTES * 60 * 1000;
}

export function useStats() {
  const { user } = useAuth();
  const { profile, refetch: refetchProfile } = useProfile();
  const hasAutoFetched = useRef(false);

  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errors, setErrors] = useState({ cf: null, lc: null, ac: null });
  const [lastFetchedAt, setLastFetchedAt] = useState(null);

  const fetchAndSave = useCallback(
    async (profileData, showRefreshing = true) => {
      const prof = profileData ?? profile;
      if (!prof || !user) return;

      const hasAnyUsername =
        prof.codeforcesUsername ||
        prof.leetcodeUsername ||
        prof.atcoderUsername;

      if (!hasAnyUsername) {
        setIsLoading(false);
        return;
      }

      if (showRefreshing) setIsRefreshing(true);

      try {
        const result = await statsService.fetchAllStats({
          codeforcesUsername: prof.codeforcesUsername,
          leetcodeUsername: prof.leetcodeUsername,
          atcoderUsername: prof.atcoderUsername,
        });

        const {
          errors: fetchErrors,
          cfContests,
          lastFetchedAt: fetchedAt,
          ...statsData
        } = result;

        setStats(statsData);
        setErrors(fetchErrors);
        setLastFetchedAt(fetchedAt);

        // Save to Appwrite
        await profileService.saveProfile(user.$id, {
          ...statsData,
          lastFetchedAt: fetchedAt,
        });

        await refetchProfile();
      } catch (error) {
        console.error("fetchAndSave error ::", error);
      } finally {
        setIsRefreshing(false);
        setIsLoading(false);
      }
    },
    [user, profile, refetchProfile]
  );

  useEffect(() => {
    if (!profile) {
      if (!isLoading) setIsLoading(false);
      return;
    }

    const cachedData = {
      cfRating: profile.cfRating ?? null,
      cfRank: profile.cfRank ?? null,
      cfSolved: profile.cfSolved ?? null,
      lcGlobalRank: profile.lcGlobalRank ?? null,
      lcSolved: profile.lcSolved ?? null,
      lcEasy: profile.lcEasy ?? null,
      lcMedium: profile.lcMedium ?? null,
      lcHard: profile.lcHard ?? null,
      acRating: profile.acRating ?? null,
      acRank: profile.acRank ?? null,
      acSolved: profile.acSolved ?? null,
    };

    setStats(cachedData);
    setLastFetchedAt(profile.lastFetchedAt ?? null);
    setIsLoading(false);

    if (isStale(profile.lastFetchedAt) && !hasAutoFetched.current) {
      hasAutoFetched.current = true;
      fetchAndSave(profile, false);
    }
  }, [profile, fetchAndSave, isLoading]);

  const refresh = useCallback(() => {
    fetchAndSave(profile, true);
  }, [fetchAndSave, profile]);

  const totalSolved =
    (stats?.cfSolved ?? 0) + (stats?.lcSolved ?? 0) + (stats?.acSolved ?? 0);

  return {
    stats,
    totalSolved,
    isLoading,
    isRefreshing,
    errors,
    lastFetchedAt,
    refresh,
  };
}
