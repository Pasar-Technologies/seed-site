import { create } from "zustand";
import { adFetchApi, adMutateApi, AD_TYPES } from "../services/api/adsApi";

const useAdStore = create((set, get) => ({
  // Ads keyed by type — each is an independent array
  ads: {
    [AD_TYPES.adlisting]: [],
    [AD_TYPES.resellad]: [],
    [AD_TYPES.stockad]: [],
  },
  loading: false,
  deleteLoading: false,
  error: null,

  fetchAllAds: async () => {
    set({ loading: true, error: null });
    try {
      const res = await adFetchApi.getAllAds();
      console.log(res);

      set({ ads: res, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },

  fetchAdsByType: async (adType) => {
    set({ loading: true, error: null });
    try {
      const response = await adFetchApi.getAdsByType(adType);
      set((state) => ({
        ads: { ...state.ads, [adType]: response.data.data },
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },

  deleteAd: async (adType, adId) => {
    set({ deleteLoading: true, error: null });
    try {
      await adMutateApi.deleteAd(adType, adId);
      set((state) => ({
        ads: {
          ...state.ads,
          [adType]: state.ads[adType].filter((ad) => ad._id !== adId),
        },
        deleteLoading: false,
      }));
      return { success: true };
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        deleteLoading: false,
      });
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      };
    }
  },

  getAdsByType: (adType) => get().ads[adType] ?? [],
  totalCount: () =>
    Object.values(get().ads).reduce((sum, list) => sum + list.length, 0),
}));

export { AD_TYPES };
export default useAdStore;
