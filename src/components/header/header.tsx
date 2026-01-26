import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { SearchPlayer } from "./search-player";

export async function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 w-full max-w-full">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div className="w-full lg:w-96 max-w-full">
          <SearchPlayer />
       </div>
      </div>
    </header>
  );
}