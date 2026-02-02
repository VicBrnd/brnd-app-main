import { Suspense } from "react";

import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { ViewSwitcher } from "@/components/files/view-switcher";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppHeader() {
  return (
    <>
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 min-w-0 flex-1 overflow-x-auto">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 hidden md:block data-[orientation=vertical]:h-4"
          />
          <div className="hidden md:block min-w-0 flex-1 overflow-x-auto">
            <AppBreadcrumb />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Suspense>
              <ViewSwitcher />
            </Suspense>
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      <div className="flex md:hidden items-center border-b px-4 py-2 overflow-x-auto overflow-y-hidden">
        <AppBreadcrumb />
      </div>
    </>
  );
}
