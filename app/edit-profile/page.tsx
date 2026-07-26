"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ProtectedRoute from "@/components/ProtectedRoute";

import profileService from "@/services/profileService";

export default function EditProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    userId: 0,
    currentStatus: "",
    goal: "",
    bio: "",
    field: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId || userId === "undefined" || userId === "null") {
        router.push("/login");
        return;
      }

      const id = Number(userId);

      try {
        const profile = await profileService.getProfileByUserId(id);

        setFormData({
          userId: id,
          currentStatus: profile.currentStatus || "",
          goal: profile.goal || "",
          bio: profile.bio || "",
          field: profile.field || "",
        });
      } catch (error) {
        console.log("Profile not found, creating new profile");

        setFormData({
          userId: id,
          currentStatus: "",
          goal: "",
          bio: "",
          field: "",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setSaving(true);

    try {
      await profileService.updateProfile(formData);

      alert("Profile updated successfully!");

      router.push("/profile");

    } catch (error) {

      console.log("Profile update failed, trying to create profile...");

      try {

        await profileService.createProfile(formData);

        alert("Profile created successfully!");

        router.push("/profile");

      } catch (createError) {

        console.error(createError);

        alert("Failed to save profile.");

      }

    } finally {

      setSaving(false);

    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="min-h-screen bg-[#F8F4EF] pt-24 pb-10 px-5">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#E7DDD4] bg-white p-8 shadow-sm">

          <h1 className="mb-6 text-3xl font-bold text-[#2D2D2D]">
            Edit Profile
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="mb-2 block font-medium">
                Current Status
              </label>

              <input
                name="currentStatus"
                value={formData.currentStatus}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E7DDD4] p-3 outline-none focus:border-[#A67C52]"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Field
              </label>

              <input
                name="field"
                value={formData.field}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E7DDD4] p-3 outline-none focus:border-[#A67C52]"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Goal
              </label>

              <input
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E7DDD4] p-3 outline-none focus:border-[#A67C52]"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Bio
              </label>

              <textarea
                name="bio"
                rows={5}
                value={formData.bio}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E7DDD4] p-3 outline-none focus:border-[#A67C52]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-[#A67C52] py-3 font-semibold text-white hover:bg-[#8F6743] disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>

          </form>

        </div>
      </main>

      <Footer />
    </ProtectedRoute>
  );
}