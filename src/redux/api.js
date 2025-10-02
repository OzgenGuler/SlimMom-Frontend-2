import axios from "axios";
import { store } from "./store.js";
export const api = axios.create({
  // baseURL: "https://slimmom-backend-o5ma.onrender.com/",
  baseURL: "http://localhost:3000/",
});
// Request interceptor ekle
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token; // reducer’dan token al
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // auth ekle
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
