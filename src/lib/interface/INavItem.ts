export interface INavItem {
  title: string;
  url: string;
  icon?: string;
  isActive?: boolean;
  requiredPermission?: string;
  isAllowed: boolean;
  items?: INavItem[];
}
export interface IMenuResponse {
  menuItems: INavItem[];
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
  availableActions?: Record<string, boolean>;
}
