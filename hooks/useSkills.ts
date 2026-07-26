"use client";

import { useEffect, useState } from "react";

import skillService, {
  Skill,
} from "@/services/skillService";

export default function useSkills(
  userId?: number
) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetchSkills();
  }, [userId]);

  const fetchSkills = async () => {
    if (!userId) return;

    setLoading(true);

    try {
      const data =
        await skillService.getUserSkills(userId);

      setSkills(data);
    } catch (error) {
      console.error(error);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (
    skillId: number
  ) => {
    try {
      await skillService.deleteSkill(skillId);

      setSkills((prev) =>
        prev.filter(
          (skill) => skill.id !== skillId
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return {
    skills,
    loading,
    refreshSkills: fetchSkills,
    deleteSkill,
  };
}