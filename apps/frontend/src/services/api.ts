import axios from "axios";
import { useSessionStore } from "../store/sessionStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://stagepass-2.onrender.com/api",
  timeout: 100000,
});

api.interceptors.request.use((config) => {
  const token = useSessionStore.getState().token;

  // Only attach token if it exists AND endpoint is not public
  if (
    token &&
    !config.url?.includes("/shows")   // 👈 skip public APIs
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});



