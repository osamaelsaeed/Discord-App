// axiosInstance.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 5000,
});

// attach interceptors ONCE here
axiosInstance.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;
