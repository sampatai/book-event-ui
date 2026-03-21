/**
 * API endpoint constants
 */
export const API_ENDPOINTS = {
  MENU: "/menu",
  USERS: "/users",
  TEAMS: "/teams",
  SETTINGS: "/settings",
  AUTH: "/auth",
} as const;

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
