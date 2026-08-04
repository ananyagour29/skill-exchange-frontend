"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiPlusCircle } from "react-icons/fi";

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
      setFormData({ ...formData, skillType: value as SkillType });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0B1315] dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between overflow-hidden">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-teal-500/15 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

        <Navbar />

        <main className="relative z-10 mx-auto w-full max-w-3xl px-4 pt-28 pb-20 sm:px-6">
          <button
            onClick={() => router.push("/skills")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition"
          >
            <FiArrowLeft /> Back to Skills
          </button>

          <div className="rounded-3xl border border-slate-200/80 dark:border-emerald-950/60 bg-white/80 dark:bg-[#0E1A1D]/90 p-6 sm:p-10 backdrop-blur-md shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3.5 py-1 text-xs font-semibold text-teal-600 dark:text-teal-400 mb-2">
                <FiPlusCircle /> Expand Portfolio
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Add New <span className="text-teal-500 dark:text-teal-400">Skill</span>
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Skill Name
                </label>
                <input
                  type="text"
                  name="skillName"
                  value={formData.skillName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-3.5 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:focus:border-teal-400"
                  placeholder="e.g., React Development, Graphic Design, Spanish"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Skill Intent
                </label>
                <select
                  name="skillType"
                  value={formData.skillType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-3.5 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:focus:border-teal-400"
                >
                  <option value="TEACHING">Teaching (I can offer this)</option>
                  <option value="LEARNING">Learning (I want to learn this)</option>
                  {/* <option value="BOTH">Both (Offer & Learn)</option> */}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <textarea
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-3.5 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:focus:border-teal-400"
                  placeholder="Describe your experience level or what you hope to gain..."
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-teal-600 hover:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:shadow-teal-600/30 disabled:opacity-50"
                >
                  {loading ? "Publishing..." : "Publish Skill"}
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/skills")}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}