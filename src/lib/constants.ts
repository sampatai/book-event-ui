/**
 * API endpoint constants
 */
export const API_ENDPOINTS = {
  NAVIGATION: "/menu",
  MENU: "/menu",
  USERS: "/users",
  BOOKINGS: "/bookings",
  TEAMS: "/teams",
  SETTINGS: "/settings",
  AUTH: "/auth",
} as const;

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
