import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_REST_BASE_URL + "/api",
  timeout: 5000, // Set a timeout value in milliseconds
  headers: {
    "Content-Type": "application/json", // Set the default content type
  },
//   withCredentials: true, // Send cookies when making cross-origin requests
});

export default axiosInstance;
