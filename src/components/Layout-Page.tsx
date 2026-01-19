import { AppSidebar } from "./app-sidebar";
import SiteHeader from "./SiteHeader";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";

function LayoutPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
      </SidebarInset>
    </SidebarProvider>
  );
}
export default LayoutPage;
