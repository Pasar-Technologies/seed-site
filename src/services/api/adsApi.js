// import axiosClient from "./axiosClient";

// export const adPostApi = {
//   createAd: (adType, adData) => axiosClient.post(`/ads/${adType}`, adData),
//   getPlans: (adType, adId) => axiosClient.get(`/ads/${adType}/${adId}/plans`),
//   applyPlans: (adType, adId, plans) =>
//     axiosClient.patch(`/ads/${adType}/${adId}/plans`, plans),
// };
import axiosClient from "./axiosClient";

export const AD_TYPES = {
  adlisting: "adlisting",
  resellad: "resellad",
  stockad: "stockad",
};

// ─── Post / Create ────────────────────────────────────────────────────────────
export const adPostApi = {
  createAd: (adType, adData) => axiosClient.post(`/ads/${adType}`, adData),
  getPlans: (adType, adId) => axiosClient.get(`/ads/${adType}/${adId}/plans`),
  applyPlans: (adType, adId, plans) =>
    axiosClient.patch(`/ads/${adType}/${adId}/plans`, plans),
};

// ─── Fetch ────────────────────────────────────────────────────────────────────
export const adFetchApi = {
  // GET /ads/adlisting  |  /ads/resellad  |  /ads/stockad
  getAdsByType: (adType) => axiosClient.get(`/ads/admin/${adType}`),

  getAllAds: () =>
    Promise.all([
      axiosClient.get(`/ads/admin/${AD_TYPES.adlisting}`),
      axiosClient.get(`/ads/admin/${AD_TYPES.resellad}`),
      axiosClient.get(`/ads/admin/${AD_TYPES.stockad}`),
    ]).then(([adlisting, resellad, stockad]) => ({
      adlisting: adlisting.data.data,
      resellad: resellad.data.data,
      stockad: stockad.data.data,
    })),

  getAdById: (adType, adId) => axiosClient.get(`/ads/${adType}/${adId}`),
};

// ─── Mutate ───────────────────────────────────────────────────────────────────
export const adMutateApi = {
  updateAd: (adType, adId, data) =>
    axiosClient.put(`/ads/${adType}/${adId}`, data),
  deleteAd: (adType, adId) => axiosClient.delete(`/ads/${adType}/${adId}`),
};
