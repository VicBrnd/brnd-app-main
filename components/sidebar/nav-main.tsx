import Link from "next/link";

import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";

import { NavSearch } from "@/components/sidebar/nav-search";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
  AppFilesDialog,
}: {
  items: {
    title: string;
    url: string;
    icon?: IconSvgElement;
  }[];
  AppFilesDialog?: React.ReactNode;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <NavSearch />
            {AppFilesDialog}
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton render={<Link href={item.url} />}>
                {item.icon && (
                  <HugeiconsIcon
                    icon={item.icon}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                )}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
