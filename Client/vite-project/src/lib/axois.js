import axios from "axios";

const startURI = import.meta.env.VITE_URL;

export const axiosInstance = axios.create({
  baseURL: `${startURI}/api`,
  withCredentials: true,
});
