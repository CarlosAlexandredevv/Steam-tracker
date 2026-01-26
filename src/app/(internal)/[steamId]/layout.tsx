import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/side-bar/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/header/header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children}: LayoutProps) {
  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <Header  />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
      </div>
    </SidebarInset>
  </SidebarProvider>
  );
}