import apiClient from "../axios";
import { API_ENDPOINTS } from "../constants";
import type { IMenuResponse } from "../interface/INavItem";

export const navigationApi = {
  getMenu: async (): Promise<IMenuResponse> => {
    const response = await apiClient.get<IMenuResponse>(
      `${API_ENDPOINTS.NAVIGATION}/user/menu`,
    );
    return response.data;
  },
};

export async function fetchNavigation(): Promise<IMenuResponse> {
  return navigationApi.getMenu();
}
