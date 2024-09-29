import axios from "axios";
const API_BASE_URL = "http://143.244.143.206:8080";

const user = JSON.parse(sessionStorage.getItem("user"));
// Create an Axios instance with the configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user?.token}`, // Retrieve token from localStorage if available
  },
  timeout: 10000, // Timeout set to 10 seconds
});
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
