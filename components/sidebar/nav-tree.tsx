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
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

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
