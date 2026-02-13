"use client";

import * as React from "react";

import Link from "next/link";

import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface NavSecondaryProps {
  items: {
    title: string;
    url: string;
    icon: IconSvgElement;
  }[];
}

export function NavSecondary({
  items,
  ...props
}: NavSecondaryProps & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton render={<Link href={item.url} />}>
                <HugeiconsIcon
                  icon={item.icon}
                  color="currentColor"
                  strokeWidth={1.5}
                />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
