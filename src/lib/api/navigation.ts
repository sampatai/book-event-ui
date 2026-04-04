import apiClient from "../axios";
import { API_ENDPOINTS } from "../constants";
import type { MenuResponse } from "../interface/NavItem";

export const navigationApi = {
  getMenu: async (): Promise<MenuResponse> => {
    const response = await apiClient.get<MenuResponse>(
      `${API_ENDPOINTS.NAVIGATION}/user/menu`,
    );
    return response.data;
  },
};

export async function fetchNavigation(): Promise<MenuResponse> {
  return navigationApi.getMenu();
}
