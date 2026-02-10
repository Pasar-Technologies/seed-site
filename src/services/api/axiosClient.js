import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://192.168.1.25:3000/api",
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
