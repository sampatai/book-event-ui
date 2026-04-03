import axios from "axios";
import type { AxiosInstance } from "axios";
import TokenService from "./token.service";

// Axios instance configured for the app.
// Set VITE_API_BASE_URL in your environment (e.g. .env) to point to the API root.
const baseURL = import.meta.env?.VITE_API_BASE_URL ?? "";

const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token on each request when available
apiClient.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor placeholder for future refresh-token handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If implementing token refresh later, handle 401 here:
    // - attempt refresh using TokenService.getLocalRefreshToken()
    // - update TokenService.updateLocalAccessToken(newToken)
    // - retry original request

    // For now just reject and allow callers to handle errors
    return Promise.reject(error);
  },
);

export default apiClient;
