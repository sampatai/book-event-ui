import * as React from "react";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./Team-switcher";
import { NavUser } from "./nav-user";
import { NavMain } from "./Nav-main";
import { useNavigation } from "@/hooks/useNavigation";

const defaultTeams = [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
];

const defaultUser = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: navItems, isLoading, isError, error } = useNavigation();

  // Log error if API fails (but gracefully fall backs to default menu)
  React.useEffect(() => {
    if (isError) {
      console.warn("Navigation menu error:", error);
    }
  }, [isError, error]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={defaultTeams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={navItems ?? []}
          label="Platform"
          isLoading={isLoading}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={defaultUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
