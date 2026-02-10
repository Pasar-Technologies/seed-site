import { create } from "zustand";
import { usersApi } from "../services/api/usersApi";

const useUserStore = create((set) => ({
  currentUser: null,
  users: [],
  loading: false,
  error: null,

  fetchAllUsers: async () => {
    set({ loading: true });
    try {
      const response = await usersApi.getAllUsers();
      set({ users: response.data.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Set user after login/verification
  setUser: (user) => set({ currentUser: user }),

  logout: () => {
    localStorage.removeItem("authToken");
    set({ currentUser: null });
  },
}));

export default useUserStore;
