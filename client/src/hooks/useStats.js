import { useRef, useEffect, useState, useCallback } from "react";
import { useAuth } from "./useAuth";
import { useProfile } from "./useProfile";
import { statsService } from "../services/stats/statsService";
import { profileService } from "../services/appwrite/profileService";

const TTL_MINUTES = 30;

function isStale(lastFetchedAt) {
  if (!lastFetchedAt) return true;

  const lastFetch = new Date(lastFetchedAt).getTime();
  const now = Date.now();

  return now - lastFetch > TTL_MINUTES * 60 * 1000;
}

export function useStats() {
  const { user } = useAuth();
  const { profile, refetch: refetchProfile } = useProfile();

  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetchedAt, setLastFetchedAt] = useState(null);

  const hasAutoFetched = useRef(false);

  const fetchAndSave = useCallback(
    async (profileData, showRefreshing = true) => {
      const prof = profileData ?? profile;
      if (!prof || !user) return;

      const codeforcesUsername = prof.codeforcesUsername;

      if (!codeforcesUsername) {
        setIsLoading(false);
        return;
      }

      if (showRefreshing) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        const result = await statsService.fetchCodeforces(
          prof.codeforcesUsername
        );

        setStats(result);
        setError(null);
        setLastFetchedAt(new Date().toISOString());

        await profileService.saveProfile(user.$id, {
          cfRating: result.cfRating,
          cfRank: result.cfRank,
          cfSolved: result.cfSolved,
          lastFetchedAt: new Date().toISOString(),
        });

        await refetchProfile();
      } catch (error) {
        setError(error.message);
      } finally {
        setIsRefreshing(false);
        setIsLoading(false);
      }
    },
    [user, profile, refetchProfile]
  );

  useEffect(() => {
    if (!profile) {
      setIsLoading(false);
      return;
    }

    setStats({
      cfRating: profile.cfRating ?? null,
      cfRank: profile.cfRank ?? null,
      cfSolved: profile.cfSolved ?? null,
      cfContests: [],
    });
    setLastFetchedAt(profile.lastFetchedAt);
    setIsLoading(false);

    if (isStale(profile.lastFetchedAt) && hasAutoFetched.current === false) {
      hasAutoFetched.current = true;
      fetchAndSave(profile, false);
    }
  }, [profile, fetchAndSave]);

  const refresh = useCallback(() => {
    fetchAndSave(profile, true);
  }, [fetchAndSave, profile]);

  return {
    stats,
    profile,
    isLoading,
    isRefreshing,
    error,
    lastFetchedAt,
    refresh,
  };
}
