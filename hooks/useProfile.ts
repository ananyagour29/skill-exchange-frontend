"use client";

import { useEffect, useState } from "react";

import profileService, {
  UserProfile,
} from "@/services/profileService";

export default function useProfile(
  userId?: number
) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const data =
          await profileService.getProfileByUserId(userId);

        setProfile(data);
      } catch (error) {
        console.error(error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const refreshProfile = async () => {
    if (!userId) return;

    setLoading(true);

    try {
      const data =
        await profileService.getProfileByUserId(userId);

      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    refreshProfile,
  };
}