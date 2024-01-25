import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_APP_BASE_URL,
  headers: { "Authorization": `Bearer ${process.env.API_READ_ACCESS_TOKEN}`},
});

export default apiClient;

