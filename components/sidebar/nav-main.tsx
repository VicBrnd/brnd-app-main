import Link from "next/link";

import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";

import { AppFilesDialog } from "@/components/files/create/app-files-dialog";
import { NavSearch } from "@/components/sidebar/nav-search";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: IconSvgElement;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <NavSearch />
            <AppFilesDialog>
              <DialogTrigger
                nativeButton={true}
                render={
                  <Button
                    size="icon"
                    className="size-8 group-data-[collapsible=icon]:opacity-0"
                    variant="outline"
                  />
                }
              >
                <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
                <span className="sr-only">Quick Create</span>
              </DialogTrigger>
            </AppFilesDialog>
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
