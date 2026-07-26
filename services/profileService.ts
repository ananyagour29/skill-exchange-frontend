import api from "./api";

export interface UserProfile {
  id?: number;
  userId: number;
  currentStatus: string;
  goal: string;
  bio: string;
  field: string;
}

export interface CreateProfileRequest {
  userId: number;
  currentStatus: string;
  goal: string;
  bio: string;
  field: string;
}

export interface UpdateProfileRequest {
  id?: number;
  userId: number;
  currentStatus: string;
  goal: string;
  bio: string;
  field: string;
}

const profileService = {
  createProfile: async (data: CreateProfileRequest) => {
    const response = await api.post("/api/profile/create", data);
    return response.data;
  },

  getAllProfiles: async (): Promise<UserProfile[]> => {
    const response = await api.get("/api/profile/all");
    return response.data;
  },

  getProfileByUserId: async (userId: number): Promise<UserProfile> => {
    const response = await api.get(`/api/profile/${userId}`);
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest) => {
    const response = await api.put("/api/profile/update", data);
    return response.data;
  },

  deleteProfile: async (userId: number) => {
    const response = await api.delete(`/api/profile/${userId}`);
    return response.data;
  },
};

export default profileService;