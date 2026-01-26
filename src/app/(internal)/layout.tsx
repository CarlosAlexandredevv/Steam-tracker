import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/side-bar/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
         <InputGroup className=" min-w-96 max-w-96">
          <InputGroupInput placeholder="Steam ID" />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
      </InputGroup>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
      </div>
    </SidebarInset>
  </SidebarProvider>
  );
}