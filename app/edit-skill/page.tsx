"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ProtectedRoute from "@/components/ProtectedRoute";

import useAuth from "@/hooks/useAuth";
import skillService, { SkillType } from "@/services/skillService";

export default function EditSkillPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const skillId = Number(searchParams.get("id"));

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    id: skillId,
    userId: 0,
    skillName: "",
    skillType: "TEACHING" as SkillType,
    description: "",
  });

  useEffect(() => {
    const loadSkill = async () => {
      if (!user?.id || !skillId) {
        setLoading(false);
        return;
      }

      try {
        const skills = await skillService.getUserSkills(user.id);

        const skill = skills.find((s) => s.id === skillId);

        if (!skill) {
          alert("Skill not found.");
          router.push("/skills");
          return;
        }

        setFormData({
          id: skill.id!,
          userId: user.id,
          skillName: skill.skillName,
          skillType: skill.skillType,
          description: skill.description,
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load skill.");
      } finally {
        setLoading(false);
      }
    };

    loadSkill();
  }, [user, skillId, router]);

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

    setSaving(true);

    try {
      await skillService.updateSkill(formData);

      alert("Skill updated successfully!");

      router.push("/skills");
    } catch (error) {
      console.error(error);
      alert("Failed to update skill.");
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
            Edit Skill
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
                required
              />
            </div>

            <div className="flex gap-4">

              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-xl bg-[#A67C52] py-3 font-semibold text-white hover:bg-[#8F6743] disabled:opacity-50"
              >
                {saving ? "Updating..." : "Update Skill"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/skills")}
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