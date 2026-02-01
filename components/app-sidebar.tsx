import * as React from "react";

import Link from "next/link";

import {
  ArrowRight01Icon,
  Chart01Icon,
  ComputerTerminal01Icon,
  DashboardBrowsingIcon,
  Folder01Icon,
  HelpCircleIcon,
  LeftToRightListBulletIcon,
  Search01Icon,
  Settings01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { MdxIcon } from "@/components/icons/mdx-icons";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: DashboardBrowsingIcon,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: LeftToRightListBulletIcon,
    },
    {
      title: "Analytics",
      url: "#",
      icon: Chart01Icon,
    },
    {
      title: "Projects",
      url: "#",
      icon: Folder01Icon,
    },
    {
      title: "Team",
      url: "#",
      icon: UserGroupIcon,
    },
  ],
  tree: [
    ["Uploadthing", ["API"]],
    ["Zustand", ["Sidebar Store"]],
    ["React", ["UseActionState"]],
    ["NextJs", "Rate-Limiter"],
    ["BetterAuth", "Auth Config"],
    ["Redis", "@upstash/redis"],
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings01Icon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: Search01Icon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="pb-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="#" />}
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
      <SidebarContent>
        <NavMain items={data.navMain} />
        <SidebarGroup>
          <SidebarGroupLabel>Files</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.tree.map((item, index) => (
                <Tree key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

type TreeItem = string | TreeItem[];

function Tree({ item }: { item: TreeItem }) {
  const [name, ...items] = Array.isArray(item) ? item : [item];

  if (!items.length) {
    return (
      <SidebarMenuButton
        isActive={name === "button.tsx"}
        className="data-[active=true]:bg-transparent"
      >
        <MdxIcon />
        {name}
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&>button[data-panel-open]>svg:last-child]:rotate-90"
        // defaultOpen={name === "components" || name === "ui"}
      >
        <SidebarMenuButton>
          <HugeiconsIcon icon={Folder01Icon} />
          {name}
        </SidebarMenuButton>
        <CollapsibleTrigger
          render={
            <SidebarMenuAction className="[&>button[data-panel-open]>svg:last-child]:rotate-90" />
          }
        >
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            className="transition-transform"
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem, index) => (
              <Tree key={index} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
