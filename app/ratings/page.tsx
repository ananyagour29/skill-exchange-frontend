"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";

import useAuth from "@/hooks/useAuth";
import ratingService from "@/services/ratingService";

export default function GiveRatingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const ratedUserId = Number(searchParams.get("userId"));

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first.");
      return;
    }

    if (!ratedUserId) {
      alert("Invalid user.");
      return;
    }

    if (ratedUserId === user.id) {
      alert("You cannot rate yourself.");
      return;
    }

    setLoading(true);

    try {
      await ratingService.createRating({
        ratedUserId,
        ratedByUserId: user.id,
        rating,
        comment,
      });

      alert("Rating submitted successfully!");

      router.push("/search");
    } catch (error) {
      console.error(error);
      alert("Failed to submit rating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="min-h-screen bg-[#F8F4EF] pt-24 pb-10 px-5">
        <div className="mx-auto max-w-xl rounded-3xl border border-[#E7DDD4] bg-white p-8 shadow-sm">

          <h1 className="mb-6 text-3xl font-bold text-[#2D2D2D]">
            Give Rating
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label className="mb-2 block font-medium">
                Rating
              </label>

              <select
                value={rating}
                onChange={(e) =>
                  setRating(Number(e.target.value))
                }
                className="w-full rounded-xl border border-[#E7DDD4] p-3 outline-none focus:border-[#A67C52]"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                <option value={4}>⭐⭐⭐⭐ (4)</option>
                <option value={3}>⭐⭐⭐ (3)</option>
                <option value={2}>⭐⭐ (2)</option>
                <option value={1}>⭐ (1)</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Comment
              </label>

              <textarea
                rows={5}
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                className="w-full rounded-xl border border-[#E7DDD4] p-3 outline-none focus:border-[#A67C52]"
                placeholder="Write your feedback..."
                required
              />
            </div>

            <div className="flex gap-4">

              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-[#A67C52] py-3 font-semibold text-white hover:bg-[#8F6743] disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Rating"}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 rounded-xl border border-[#A67C52] py-3 font-semibold text-[#A67C52] hover:bg-[#F8F4EF]"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      </main>

      <Footer />
    </ProtectedRoute>
  );
}