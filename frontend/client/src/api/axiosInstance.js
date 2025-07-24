import axios from "axios";
import { isTokenExpired, clearAuth } from "../utils/auth";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8001",
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Check if token is expired before making request
      if (isTokenExpired(token)) {
        clearAuth();
        window.location.href = "/login?sessionExpired=1";
        return Promise.reject(new Error("Token expired"));
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Don't redirect if this is a login attempt (to avoid infinite loops)
      const isLoginRequest = error.config.url.includes('/token');
      
      if (!isLoginRequest) {
        // Clear authentication data and redirect to login
        clearAuth();
        
        // Show a toast or alert before redirect (optional)
        console.log("Session expired. Redirecting to login...");
        
        // Redirect to login with session expired parameter
        window.location.href = "/login?sessionExpired=1";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 