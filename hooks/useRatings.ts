"use client";

import { useEffect, useState } from "react";

import ratingService, {
  Rating,
} from "@/services/ratingService";

export default function useRatings(
  userId?: number
) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetchRatings();
  }, [userId]);

  const fetchRatings = async () => {
    if (!userId) return;

    setLoading(true);

    try {
      const data =
        await ratingService.getRatingsByUser(userId);

      setRatings(data);
    } catch (error) {
      console.error(error);
      setRatings([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteRating = async (
    ratingId: number
  ) => {
    try {
      await ratingService.deleteRating(ratingId);

      setRatings((prev) =>
        prev.filter(
          (rating) => rating.id !== ratingId
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return {
    ratings,
    loading,
    refreshRatings: fetchRatings,
    deleteRating,
  };
}