import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/side-bar/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/header/header";
import { Separator } from "@/components/ui/separator";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children}: LayoutProps) {
  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <Header  />
      <Separator orientation="horizontal" className="mb-2" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
      </div>
    </SidebarInset>
  </SidebarProvider>
  );
}