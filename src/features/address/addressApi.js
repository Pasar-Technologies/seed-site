import axiosClient from "../../shared/services/axiosClient";

// All address routes are under /account/addresses
export const addressApi = {
  // GET /account/addresses
  getMyAddresses: () => axiosClient.get("/account/addresses"),

  // GET /account/addresses/admin/:userId (admin)
  getAddressesByUser: (userId) =>
    axiosClient.get(`/account/addresses/admin/${userId}`),

  // POST /account/addresses → 201
  createAddress: (data) =>
    axiosClient.post("/account/addresses", data).then((res) => res.data),

  // PUT /account/addresses/:addressId
  updateAddress: (addressId, data) =>
    axiosClient.put(`/account/addresses/${addressId}`, data),

  // DELETE /account/addresses/:addressId
  deleteAddress: (addressId) =>
    axiosClient.delete(`/account/addresses/${addressId}`),

  // GET /account/addresses/states (public)
  getStates: () => axiosClient.get("/account/addresses/states"),

  // GET /account/addresses/districts?state=Karnataka (public)
  getDistricts: (state) =>
    axiosClient.get("/account/addresses/districts", { params: { state } }),
};
