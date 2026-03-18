import { useState, useEffect, useCallback } from "react";
import { profileService } from "../services/appwrite/profileService";
import { useAuth } from "./useAuth";

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const userData = await profileService.getProfile(user.$id);
      setProfile(userData);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const saveProfile = useCallback(
    async (data) => {
      if (!user) return;
      try {
        setError(null);
        const updatedUser = await profileService.saveProfile(user.$id, data);
        setProfile(updatedUser);
        return updatedUser;
      } catch (error) {
        setError(error);
        throw error;
      }
    },
    [user]
  );

  const deleteProfile = useCallback(async () => {
    if (!profile) return;
    try {
      setError(null);
      await profileService.deleteProfile(profile.$id);
      setProfile(null);
    } catch (error) {
      setError(error);
      throw error;
    }
  }, [profile]);

  return {
    profile,
    isLoading,
    error,
    saveProfile,
    deleteProfile,
    refetch: fetchProfile,
  };
}
