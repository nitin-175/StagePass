import axios from "axios";
import { useSessionStore } from "../store/sessionStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://stagepass-2.onrender.com/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = useSessionStore.getState().token;

  if (token && token !== "undefined" && token !== "null") {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});
