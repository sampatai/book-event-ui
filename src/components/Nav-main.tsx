"use client";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getIconByName } from "@/lib/icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
  label = "Platform",
  isLoading = false,
}: {
  items: {
    title: string;
    url: string;
    icon?: string | LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
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
            // Resolve icon: if it's a string, get the component; otherwise use as-is
            const IconComponent =
              typeof item.icon === "string"
                ? getIconByName(item.icon)
                : item.icon;

            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {IconComponent && <IconComponent />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link
                              to={subItem.url}
                              params={{}}
                              search={undefined}
                            >
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          })
        ) : (
          <div className="text-sm text-gray-500 p-2">No menu items</div>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
