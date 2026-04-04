/**
 * API endpoint constants
 */
export const API_ENDPOINTS = {
  NAVIGATION: "/navigations",
  PANDITS: "/pandits",
  USERS: "/users",
  BOOKINGS: "/bookings",
  SETTINGS: "/settings",
  AUTH: "/auth",
} as const;

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
