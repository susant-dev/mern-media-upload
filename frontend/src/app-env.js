const env = import.meta.env;

export const API_URL = env.VITE_BACKEND_API_URL || "http://localhost:3000";
