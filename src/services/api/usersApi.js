import axiosClient from "./axiosClient";

export const usersApi = {
  getProfile: () => axiosClient.get("/user"),
  getAllUsers: () => axiosClient.get("/user/all"),
  deleteUser: (userId) => axiosClient.delete(`/user/${userId}`),
  updatePersonal: (data) => axiosClient.patch("/user/update/personal", data),
  updateLanguages: (languages) =>
    axiosClient.patch("/user/update/languages", { languages }),
  createAddress: (data) => axiosClient.post("/address", data),
};
