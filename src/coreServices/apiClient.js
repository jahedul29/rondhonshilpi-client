import axios from "axios";

/**
 * @name Api Client
 * @role Connect with the main api endpoint
 * @param withCredentials need for sanctum
 * @return connect api client
 *
 */
const apiClient = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
});

export default apiClient;
