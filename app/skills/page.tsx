
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiPlus, FiEdit2, FiTrash2, FiBookOpen, FiAward, FiLayers } from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import ProtectedRoute from "@/components/ProtectedRoute";

import useAuth from "@/hooks/useAuth";
import skillService, { Skill } from "@/services/skillService";

export default function SkillsPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserSkills = async () => {
      if (!user?.id) return;

      try {
        const data = await skillService.getUserSkills(user.id);
        setSkills(data);
      } catch (error) {
        console.error("Failed to load skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSkills();
  }, [user]);

  const handleDelete = async (skillId: number) => {
    if (!confirm("Are you sure you want to delete this skill?")) {
      return;
    }

    try {
      await skillService.deleteSkill(skillId);
      setSkills((prev) => prev.filter((skill) => skill.id !== skillId));
    } catch (error) {
      console.error(error);
      alert("Failed to delete skill.");
    }
  };

  const getSkillBadgeColor = (type: string) => {
    switch (type) {
      case "TEACHING":
        return "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20";
      case "LEARNING":
        return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
      default:
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    }
  };

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0B1315] dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between overflow-hidden">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-teal-500/15 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

        <Navbar />

        <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-10">
          {/* Hero Header */}
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-slate-200/80 dark:border-emerald-950/60 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3.5 py-1 text-xs font-semibold text-teal-600 dark:text-teal-400 mb-3">
                <FiLayers className="text-sm" /> Dashboard
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                My Skills <span className="text-teal-500 dark:text-teal-400">Inventory</span>
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
                Manage the skills you want to share or acquire across the community.
              </p>
            </div>

            <Link
              href="/skills/add"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:shadow-teal-600/30 shrink-0"
            >
              <FiPlus className="text-lg" /> Add New Skill
            </Link>
          </div>

          {/* Grid View */}
          {loading ? (
            <Loader />
          ) : skills.length === 0 ? (
            <div className="rounded-3xl border border-slate-200/80 dark:border-emerald-950/60 bg-white/70 dark:bg-[#0E1A1D]/80 p-12 text-center backdrop-blur-md shadow-sm">
              <EmptyState
                title="No Skills Listed Yet"
                description="Start building your profile by listing skills you can teach or want to learn."
              />
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-emerald-950/60 bg-white/80 dark:bg-[#0E1A1D]/90 p-6 backdrop-blur-md shadow-sm transition hover:shadow-md hover:border-teal-500/40 dark:hover:border-teal-500/40"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400 transition">
                        {skill.skillName}
                      </h3>
                      <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-semibold ${getSkillBadgeColor(skill.skillType)}`}>
                        {skill.skillType}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-emerald-950/40 pt-4">
                    <button
                      onClick={() => router.push(`/skills/edit/${skill.id}`)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-teal-500 dark:hover:text-teal-400"
                    >
                      <FiEdit2 /> Edit
                    </button>

                    <button
                      onClick={() => handleDelete(skill.id!)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 dark:border-rose-950/60 bg-rose-50/50 dark:bg-rose-950/20 px-3.5 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 transition hover:bg-rose-100 dark:hover:bg-rose-950/40"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}