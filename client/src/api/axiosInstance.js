import axios from "axios";

// Base URL pinned to production API to avoid env misconfiguration during deploys
const api = axios.create({
  baseURL: "https://mern-portfolio-backend-v2.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
