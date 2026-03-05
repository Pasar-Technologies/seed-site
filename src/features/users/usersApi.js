import axiosClient from "../../shared/services/axiosClient";

// All user routes are under /account/users
export const usersApi = {
  // GET /account/users/me
  getCurrentUser: () => axiosClient.get("/account/users/me"),

  // GET /account/users/all (admin)
  getAllUsers: () => axiosClient.get("/account/users/all"),

  // DELETE /account/users/:userId (admin)
  deleteUser: (userId) => axiosClient.delete(`/account/users/${userId}`),

  // PATCH /account/users/update/personal
  updatePersonalInfo: (data) =>
    axiosClient.patch("/account/users/update/personal", data),

  // PATCH /account/users/update/business
  updateBusinessInfo: (data) =>
    axiosClient.patch("/account/users/update/business", data),

  // PATCH /account/users/update/languages
  updateLanguages: (languages) =>
    axiosClient.patch("/account/users/update/languages", { languages }),

  // PATCH /account/users/update/availability
  updateSchedule: (schedule) =>
    axiosClient.patch("/account/users/update/availability", { schedule }),

  // PATCH /account/users/update/preferences
  updatePreferences: (preferences) =>
    axiosClient.patch("/account/users/update/preferences", { preferences }),

  // PATCH /account/users/update/media
  updateBusinessMedia: (businessMedia) =>
    axiosClient.patch("/account/users/update/media", { businessMedia }),
};
