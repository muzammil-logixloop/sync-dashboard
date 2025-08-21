import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL:   "https://sync-qjwe.onrender.com", //"http://192.168.100.12:3000",<-- your backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to headers if present
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
