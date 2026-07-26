"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";

import useAuth from "@/hooks/useAuth";
import skillService, { SkillType } from "@/services/skillService";

export default function AddSkillPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    skillName: "",
    skillType: "TEACHING" as SkillType,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "skillType") {
      setFormData({
        ...formData,
        skillType: value as SkillType,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first.");
      return;
    }

    setLoading(true);

    try {
      await skillService.createSkill({
        userId: user.id,
        skillName: formData.skillName,
        skillType: formData.skillType,
        description: formData.description,
      });

      alert("Skill added successfully!");
      router.push("/skills");

    } catch (error) {
      console.error("Error creating skill:", error);
      alert("Failed to create skill.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="min-h-screen bg-[#F8F4EF] pt-24 pb-10 px-5">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#E7DDD4] bg-white p-8 shadow-sm">

          <h1 className="mb-6 text-3xl font-bold text-[#2D2D2D]">
            Add Skill
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label className="mb-2 block font-medium">
                Skill Name
              </label>

              <input
                type="text"
                name="skillName"
                value={formData.skillName}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E7DDD4] p-3 outline-none focus:border-[#A67C52]"
                placeholder="Enter skill name"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Skill Type
              </label>

              <select
                name="skillType"
                value={formData.skillType}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E7DDD4] p-3 outline-none focus:border-[#A67C52]"
              >
                <option value="TEACHING">Teaching</option>
                <option value="LEARNING">Learning</option>
                <option value="BOTH">Both</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Description
              </label>

              <textarea
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E7DDD4] p-3 outline-none focus:border-[#A67C52]"
                placeholder="Describe your skill..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#A67C52] py-3 font-semibold text-white hover:bg-[#8F6743] disabled:opacity-50"
            >
              {loading ? "Saving..." : "Add Skill"}
            </button>

          </form>

        </div>
      </main>

      <Footer />
    </ProtectedRoute>
  );
}