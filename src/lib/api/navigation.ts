import apiClient from "../axios";
import { API_ENDPOINTS } from "../constants";

export interface NavItem {
  title: string;
  url: string;
  icon?: string;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export interface MenuResponse {
  success: boolean;
  data: {
    navMain: NavItem[];
    teams?: {
      name: string;
      logo?: string;
      plan: string;
    }[];
    user?: {
      name: string;
      email: string;
      avatar: string;
    };
  };
}

export const navigationApi = {
  getMenu: async (): Promise<MenuResponse> => {
    const response = await apiClient.get<MenuResponse>(
      API_ENDPOINTS.NAVIGATION,
    );
    return response.data;
  },
};

// Backward-compatible function currently used by `useNavigation`
export async function fetchNavigation(): Promise<MenuResponse> {
  return navigationApi.getMenu();
}

// Fallback menu in case API fails
export const defaultMenu: MenuResponse = {
  success: true,
  data: {
    navMain: [
      {
        title: "Playground",
        url: "/",
        icon: "SquareTerminal",
        isActive: true,
        items: [
          {
            title: "History",
            url: "/",
          },
          {
            title: "Starred",
            url: "/",
          },
          {
            title: "Settings",
            url: "/settings",
          },
        ],
      },
      {
        title: "Models",
        url: "/",
        icon: "Bot",
        items: [
          {
            title: "Genesis",
            url: "/",
          },
          {
            title: "Explorer",
            url: "/",
          },
          {
            title: "Quantum",
            url: "/",
          },
        ],
      },
      {
        title: "Documentation",
        url: "/",
        icon: "BookOpen",
        items: [
          {
            title: "Introduction",
            url: "/",
          },
          {
            title: "Get Started",
            url: "/",
          },
          {
            title: "Tutorials",
            url: "/",
          },
          {
            title: "Changelog",
            url: "/",
          },
        ],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: "Settings2",
        items: [
          {
            title: "General",
            url: "/settings",
          },
          {
            title: "Team",
            url: "/",
          },
          {
            title: "Billing",
            url: "/",
          },
          {
            title: "Limits",
            url: "/",
          },
        ],
      },
    ],
  },
};
