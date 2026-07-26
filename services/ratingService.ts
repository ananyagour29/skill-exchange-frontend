import api from "./api";

export interface Rating {
  id?: number;
  ratedUserId: number;
  ratedByUserId: number;
  rating: number;
  comment: string;
  createdAt?: string;
}

const ratingService = {
  createRating: async (data: Rating) => {
    const response = await api.post("/api/ratings/create", data);
    return response.data;
  },

  getRatingsByUser: async (userId: number): Promise<Rating[]> => {
    const response = await api.get(`/api/ratings/user/${userId}`);
    return response.data;
  },

  updateRating: async (data: Rating) => {
    const response = await api.put("/api/ratings/update", data);
    return response.data;
  },

  deleteRating: async (ratingId: number) => {
    const response = await api.delete(`/api/ratings/${ratingId}`);
    return response.data;
  },
};

export default ratingService;