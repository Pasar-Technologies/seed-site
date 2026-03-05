import axios from "axios";

const BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/api.*$/, "");

const axiosClient = axios.create({
  baseURL: `${BASE}/api/v1`,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
