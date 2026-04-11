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
      // Including X-CSRF token from original sample based on OIDC setup
      config.headers["X-CSRF"] = "1";
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 Unauthorized responses securely
    if (error.response && error.response.status === 401) {
      TokenService.removeUser();

      // Optionally trigger a page reload which will lead to the authentication
      // guard in App.tsx triggering a signinRedirect if needed.
      if (typeof globalThis !== "undefined" && globalThis.window) {
        globalThis.window.location.reload();
      }
    }

    // For now just reject and allow callers to handle errors
    return Promise.reject(error);
  },
);

export default apiClient;
