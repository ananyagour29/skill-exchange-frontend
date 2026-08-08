
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
    // '/api' hata diya hai kyunki yeh baseURL mein pehle se attached hota hai
    const response = await api.get("/skills/search", {
      params,
    });

    return response.data;
  },
};

export default searchService;