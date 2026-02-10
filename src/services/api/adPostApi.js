import axiosClient from "./axiosClient";

export const adPostApi = {
  createAd: (adType, adData) => axiosClient.post(`/ads/${adType}`, adData),
  getPlans: (adType, adId) => axiosClient.get(`/ads/${adType}/${adId}/plans`),
  applyPlans: (adType, adId, plans) =>
    axiosClient.patch(`/ads/${adType}/${adId}/plans`, plans),
};
