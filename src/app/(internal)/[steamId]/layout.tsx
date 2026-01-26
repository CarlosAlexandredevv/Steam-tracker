import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/side-bar/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/header/header";
import { SteamIdRouteParams } from "@/types/route-params";

interface LayoutProps {
  children: React.ReactNode;
  params: SteamIdRouteParams;
}

export default function Layout({ children, params }: LayoutProps) {
  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <Header params={params} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
      </div>
    </SidebarInset>
  </SidebarProvider>
  );
}