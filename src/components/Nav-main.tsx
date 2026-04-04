"use client";
import { Link } from "@tanstack/react-router";
import { getIconByName } from "@/lib/icons";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
type NavItemProps = {
  title: string;
  url: string;
  icon?: string;
  isActive?: boolean;
  requiredPermission?: string;
  isAllowed: boolean;
  items?: NavItemProps[];
};

export function NavMain({
  items,
  label = "",
  isLoading = false,
}: {
  items: NavItemProps[];
  label?: string;
  isLoading?: boolean;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="h-10 rounded-md bg-gray-200 animate-pulse mb-2"
            />
          ))
        ) : items.length > 0 ? (
          items.map((item) => {
            const IconComponent =
              typeof item.icon === "string"
                ? getIconByName(item.icon)
                : item.icon;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url} params={{}} search={undefined}>
                    {IconComponent && <IconComponent />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })
        ) : (
          <div className="text-sm text-gray-500 p-2">No menu items</div>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
