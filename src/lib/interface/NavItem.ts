export interface NavItem {
  title: string;
  url: string;
  icon?: string;
  isActive?: boolean;
  requiredPermission?: string;
  isAllowed: boolean;
  items?: NavItem[];
}
export interface MenuResponse {
  menuItems: NavItem[];
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
  availableActions?: Record<string, boolean>;
}
