import axios from "axios";
import TokenService from "./token.service";

// Extend the default Axios request configuration to include our custom 'skipAuth' property.
// This provides type safety and autocompletion for this custom flag.
declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}

// Create a pre-configured axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    // Allow callers to explicitly opt-out by setting `config.skipAuth = true`
    if (config.skipAuth) {
      return config;
    }

    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle token refresh according to OpenIddict standards
apiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    // This condition checks for a 401 Unauthorized error and ensures we don't get into an infinite retry loop.
    if (
      err.response?.status === 401 &&
      originalConfig &&
      !originalConfig._retry &&
      !originalConfig.skipAuth
    ) {
      originalConfig._retry = true;

      try {
        const refreshToken = TokenService.getLocalRefreshToken();
        if (!refreshToken) {
          // If no refresh token is available, we can't refresh.
          TokenService.removeUser();
          // Optionally redirect to login page
          // window.location = '/login';
          return Promise.reject(err);
        }

        // Prepare the form data for the token request
        const params = new URLSearchParams();
        params.append("grant_type", "refresh_token");
        params.append("refresh_token", refreshToken);
        params.append("client_id", import.meta.env.VITE_OPENIDDICT_CLIENT_ID);

        // Make the token refresh request
        const rs = await apiClient.post("/connect/token", params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        // Standard OAuth2.0 response has "access_token"
        const { access_token } = rs.data;
        TokenService.updateLocalAccessToken(access_token);

        // Update the authorization header on the original request and retry
        originalConfig.headers["Authorization"] = "Bearer " + access_token;
        return apiClient(originalConfig);
      } catch (_error) {
        // If refresh token fails, the session is invalid.
        TokenService.removeUser();
        // Optionally redirect to login page
        // window.location = '/login';
        return Promise.reject(_error);
      }
    }

    return Promise.reject(err);
  },
);

export default apiClient;
