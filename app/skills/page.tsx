"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import SkillCard from "@/components/SkillCard";
import ProtectedRoute from "@/components/ProtectedRoute";

import useAuth from "@/hooks/useAuth";
import skillService, { Skill } from "@/services/skillService";

export default function SkillsPage() {
  const { user } = useAuth();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      if (!user?.id) return;

      try {
        const data = await skillService.getUserSkills(user.id);
        setSkills(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [user]);

  const handleDelete = async (skillId: number) => {
    if (!confirm("Are you sure you want to delete this skill?")) {
      return;
    }

    try {
      await skillService.deleteSkill(skillId);

      setSkills((prev) =>
        prev.filter((skill) => skill.id !== skillId)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete skill.");
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="min-h-screen bg-[#F8F4EF] pt-24 pb-10 px-5">
        <div className="mx-auto max-w-5xl">

          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#2D2D2D]">
              My Skills
            </h1>

            <Link
              href="/add-skill"
              className="rounded-xl bg-[#A67C52] px-5 py-2 text-white hover:bg-[#8F6743]"
            >
              Add Skill
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : skills.length === 0 ? (
            <EmptyState
              title="No Skills Added"
              description="Add your first skill to start teaching or learning."
            />
          ) : (
            <div className="grid gap-5">
              {skills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  skillName={skill.skillName}
                  skillType={skill.skillType}
                  description={skill.description}
                  showActions
                  onEdit={() =>
                    window.location.href = `/edit-skill?id=${skill.id}`
                  }
                  onDelete={() =>
                    handleDelete(skill.id!)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </ProtectedRoute>
  );
}