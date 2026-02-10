import axiosClient from "./axiosClient";

export const addressApi = {
  getProfile: (userId) => axiosClient.get(`/address/admin/${userId}`),
};
