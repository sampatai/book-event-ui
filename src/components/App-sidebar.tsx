import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavMain } from "./Nav-main";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import { useEffect } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, isLoading, isError, error } = useNavigation();
  useEffect(() => {
    if (isError) {
      console.warn("Navigation menu error:", error);
    }
  }, [isError, error]);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data?.menuItems ?? []}
          label="Platform"
          isLoading={isLoading}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
