import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: "",
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: "",
    },
    {
      title: "Analytics",
      url: "#",
      icon: "",
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: "",
    },
    {
      title: "Get Help",
      url: "#",
      icon: "",
    },
    {
      title: "Search",
      url: "#",
      icon: "",
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} /> */}
      </SidebarContent>
    </Sidebar>
  );
}
