import axios from "axios";

export const http = axios.create({
  baseURL: "/api",
  withCredentials: false,
});

http.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("HTTP Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
