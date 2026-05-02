import axios from "axios";
import { useSessionStore } from "../store/sessionStore";

export const api = axios.create({
baseURL:
import.meta.env.VITE_API_BASE_URL ??
"https://stagepass-2.onrender.com/api",
timeout: 10000,
});

api.interceptors.request.use((config) => {
const token = useSessionStore.getState().token;

// Only attach Authorization if token is valid
if (typeof token === "string" && token.trim().length > 0) {
config.headers = {
...config.headers,
Authorization: `Bearer ${token}`,
};
} else {
// Ensure no invalid Authorization header is sent
if (config.headers && "Authorization" in config.headers) {
delete config.headers.Authorization;
}
}

return config;
});
