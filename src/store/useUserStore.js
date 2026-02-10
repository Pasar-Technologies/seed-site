// store/useUserStore.js
import { create } from "zustand";
import { usersApi } from "../services/api/usersApi";

const useUserStore = create((set, get) => ({
  currentUser: null,
  users: [],
  loading: false,
  error: null,
  deleteLoading: false,

  fetchAllUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await usersApi.getAllUsers();
      set({ users: response.data.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteUser: async (userId) => {
    set({ deleteLoading: true, error: null });
    try {
      const response = await usersApi.deleteUser(userId);

      // Remove user from local state
      set((state) => ({
        users: state.users.filter((user) => user._id !== userId),
        deleteLoading: false,
      }));

      return { success: true, data: response.data };
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

  findUserById: (userId) => {
    const user = get().users.find((user) => user._id === userId);
    return user || null;
  },

  setUser: (user) => set({ currentUser: user }),

  logout: () => {
    localStorage.removeItem("authToken");
    set({ currentUser: null });
  },
}));

export default useUserStore;
