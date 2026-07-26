import api from "./api";

export type SkillType = "TEACHING" | "LEARNING" | "BOTH";

export interface Skill {
  id?: number;
  userId: number;
  name?: string;
  email?: string;
  skillName: string;
  skillType: SkillType;
  description: string;
}

export interface SearchSkillParams {
  skillName?: string;
  skillType?: SkillType;
}

const skillService = {
  createSkill: async (data: Skill) => {
    const response = await api.post("/api/skills/create", data);
    return response.data;
  },

  getAllSkills: async (): Promise<Skill[]> => {
    const response = await api.get("/api/skills/all");
    return response.data;
  },

  getUserSkills: async (userId: number): Promise<Skill[]> => {
    const response = await api.get(`/api/skills/user/${userId}`);
    return response.data;
  },

  updateSkill: async (data: Skill) => {
    const response = await api.put("/api/skills/update", data);
    return response.data;
  },

  deleteSkill: async (skillId: number) => {
    const response = await api.delete(`/api/skills/${skillId}`);
    return response.data;
  },

  searchSkills: async (params: SearchSkillParams): Promise<Skill[]> => {
    const response = await api.get("/api/skills/search", {
      params,
    });
    return response.data;
  },
};

export default skillService;