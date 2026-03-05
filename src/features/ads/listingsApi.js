import axiosClient from "../../shared/services/axiosClient";

export const AD_TYPES = {
  adlisting: "adlisting",
  resellad: "resellad",
  stockad: "stockad",
};

// Post / Create — /ads/listing
export const adPostApi = {
  // POST /ads/listing/:adType → 201, response.data.data = created ad
  createAd: (adType, adData) =>
    axiosClient.post(`/ads/listing/${adType}`, adData).then((res) => res.data.data),

  // GET /billing/plans (public) — list plans to pick from
  getPlans: () =>
    axiosClient.get("/billing/plans").then((res) => res.data.data),

  // PATCH /billing/ad-plans/:adType/:adId/apply — body: { planId }
  applyPlan: (adType, adId, planId) =>
    axiosClient
      .patch(`/billing/ad-plans/${adType}/${adId}/apply`, { planId })
      .then((res) => res.data.data),

  // PATCH /billing/ad-plans/:adType/:adId/renew — body: { planId }
  renewPlan: (adType, adId, planId) =>
    axiosClient
      .patch(`/billing/ad-plans/${adType}/${adId}/renew`, { planId })
      .then((res) => res.data.data),
};

// Fetch — /ads/listing
export const adFetchApi = {
  // GET /ads/listing/admin/:adType (public)
  getAdsByType: (adType) =>
    axiosClient.get(`/ads/listing/admin/${adType}`).then((res) => res.data.data),

  // GET /ads/listing/dashboard (protected)
  getDashboard: () =>
    axiosClient.get("/ads/listing/dashboard").then((res) => res.data.data),

  // GET /ads/listing/my-ads/:adType (protected)
  getMyAdsByType: (adType) =>
    axiosClient.get(`/ads/listing/my-ads/${adType}`).then((res) => res.data.data),

  getAllAds: () =>
    Promise.all([
      axiosClient.get(`/ads/listing/admin/${AD_TYPES.adlisting}`),
      axiosClient.get(`/ads/listing/admin/${AD_TYPES.resellad}`),
      axiosClient.get(`/ads/listing/admin/${AD_TYPES.stockad}`),
    ]).then(([adlisting, resellad, stockad]) => ({
      adlisting: adlisting.data.data,
      resellad: resellad.data.data,
      stockad: stockad.data.data,
    })),
};

// Mutate — /ads/listing
export const adMutateApi = {
  // DELETE /ads/listing/:adType/:adId (draft only)
  deleteAd: (adType, adId) =>
    axiosClient.delete(`/ads/listing/${adType}/${adId}`),

  // PATCH /ads/listing/:adType/:adId/visibility  body: { visibility: bool }
  toggleVisibility: (adType, adId, visibility) =>
    axiosClient.patch(`/ads/listing/${adType}/${adId}/visibility`, { visibility }),

  // PATCH /ads/listing/resellad/:adId/mark-sold
  markSold: (adId) =>
    axiosClient.patch(`/ads/listing/resellad/${adId}/mark-sold`),

  // PATCH /ads/listing/:adType/:adId/archive
  archiveAd: (adType, adId) =>
    axiosClient.patch(`/ads/listing/${adType}/${adId}/archive`),
};
