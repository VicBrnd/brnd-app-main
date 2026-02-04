"use client";

import Link from "next/link";

import {
  Add01Icon,
  File01Icon,
  Folder01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
            <Button variant="outline" className="w-full shrink">
              <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />{" "}
              <span>Search</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    size="icon"
                    className="size-8 group-data-[collapsible=icon]:opacity-0"
                    variant="outline"
                  >
                    <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
                    <span className="sr-only">Quick Create</span>
                  </Button>
                }
              />
              <DropdownMenuContent
                align="end"
                sideOffset={9}
                className="w-auto"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Write</DropdownMenuLabel>
                  <DropdownMenuItem
                    render={<Link href="/dashboard/create/collection" />}
                  >
                    <HugeiconsIcon icon={Folder01Icon} className="mr-1" />
                    New Collection
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    render={<Link href="/dashboard/create/document" />}
                  >
                    <HugeiconsIcon icon={File01Icon} className="mr-1" />
                    New Document
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
