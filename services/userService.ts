// import api from "./api";

// export interface User {
//   id?: number;
//   name: string;
//   email: string;
//   password?: string;
//   role: "LEARNER" | "TEACHER" | "BOTH";
//   createdAt?: string;
// }

// export interface RegisterUserRequest {
//   name: string;
//   email: string;
//   password: string;
//   role: "LEARNER" | "TEACHER" | "BOTH";
// }

// export interface UpdateUserRequest {
//   id: number;
//   name: string;
//   email: string;
//   role: "LEARNER" | "TEACHER" | "BOTH";
// }

// const userService = {
//   registerUser: async (data: RegisterUserRequest) => {
//     const response = await api.post("/registerUser", data);
//     return response.data;
//   },

//   getAllUsers: async (): Promise<User[]> => {
//     const response = await api.get("/getAllUsers");
//     return response.data;
//   },

//   getUserById: async (id: number): Promise<User> => {
//     const response = await api.get(`/getUserById/${id}`);
//     return response.data;
//   },

//   updateUser: async (data: UpdateUserRequest) => {
//     const response = await api.put("/updateUser", data);
//     return response.data;
//   },

//   deleteUser: async (id: number) => {
//     const response = await api.delete(`/deleteUser/${id}`);
//     return response.data;
//   },
// };

// export default userService;
