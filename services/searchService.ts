import api from "./api";
import { Skill, SkillType } from "./skillService";

export interface SearchParams {
  skillName?: string;
  skillType?: SkillType;
}

const searchService = {
  searchSkills: async (
    params: SearchParams
  ): Promise<Skill[]> => {
    const response = await api.get("/api/skills/search", {
      params,
    });

    return response.data;
  },
};

export default searchService;