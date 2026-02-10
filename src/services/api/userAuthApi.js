import axiosClient from "./axiosClient";

export const usersAuthApi = {
  register: (data) =>
    axiosClient.post("/auth/register", { ...data, accountType: "individual" }),
  verifyRegister: (data) => axiosClient.post("/auth/verify-register", data),
};
