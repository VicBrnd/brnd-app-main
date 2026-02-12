import Link from "next/link";

import { ArrowRight01Icon, Folder01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { MdxIcon } from "@/components/icons/mdx-icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export type TreeNode = {
  name: string;
  href?: string;
  color?: string;
  children?: TreeNode[];
};

export function NavTree({ item }: { item: TreeNode }) {
  // If the item has no children, render it as a simple menu button
  if (!item.children) {
    return (
      <SidebarMenuButton
        render={item.href ? <Link href={item.href} /> : undefined}
        className="data-[active=true]:bg-transparent"
      >
        <MdxIcon />
        {item.name}
      </SidebarMenuButton>
    );
  }

  // If the item has children, render it as a collapsible menu item
  return (
    <SidebarMenuItem>
      <Collapsible className="group/collapsible [&>button[data-panel-open]>svg:last-child]:rotate-90">
        <SidebarMenuButton
          render={item.href ? <Link href={item.href} /> : undefined}
        >
          <HugeiconsIcon
            icon={Folder01Icon}
            style={item.color ? { color: item.color } : undefined}
          />
          {item.name}
        </SidebarMenuButton>
        <CollapsibleTrigger render={<SidebarMenuAction />}>
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            className="transition-transform"
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children.map((child, index) => (
              <NavTree key={index} item={child} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

export function NavTreeSkeleton() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Files</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {Array.from({ length: 3 }).map((_, i) => (
            <SidebarMenuItem key={i}>
              <SidebarMenuButton className="pointer-events-none">
                <Skeleton className="size-4 rounded" />
                <Skeleton className="h-4 w-24" />
              </SidebarMenuButton>
              <SidebarMenuSub>
                {Array.from({ length: i === 0 ? 3 : 2 }).map((_, j) => (
                  <SidebarMenuButton key={j} className="pointer-events-none">
                    <Skeleton className="size-4 rounded" />
                    <Skeleton className="h-3.5 w-20" />
                  </SidebarMenuButton>
                ))}
              </SidebarMenuSub>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
