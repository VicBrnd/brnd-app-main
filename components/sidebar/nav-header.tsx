import Link from "next/link";

import { ComputerTerminal01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavHeader() {
  return (
    <SidebarHeader className="pb-0">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            render={<Link href="/dashboard" />}
            className="data-[slot=sidebar-menu-button]:p-1.5!"
          >
            <HugeiconsIcon
              icon={ComputerTerminal01Icon}
              strokeWidth={2}
              className="size-5! pointer-events-none"
            />
            <span className="text-base font-semibold">Brnd Inc.</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
