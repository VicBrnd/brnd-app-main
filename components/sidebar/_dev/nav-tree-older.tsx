"use client";
import { useState } from "react";

import type { CollectionsProps } from "@/lib/data/collections/get-collections";

import Link from "next/link";

import {
  Add01Icon,
  ArrowRight01Icon,
  Folder01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { CreateDocumentStep } from "@/components/files/create/create-document-step";
import { MdxIcon } from "@/components/icons/mdx-icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import { useActive } from "@/hooks/use-active-path";

export type TreeNode = {
  name: string;
  href?: string;
  color?: string;
  slug?: string;
  collectionId?: string;
  children?: TreeNode[];
};

export function NavTree(props: {
  item: TreeNode;
  collectionsData?: CollectionsProps[];
}) {
  const { isActive, isPartOf } = useActive();
  const [manualOpen, setManualOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  if (!props.item.children) {
    return (
      <SidebarMenuButton
        isActive={props.item.href ? isActive(props.item.href) : false}
        render={props.item.href ? <Link href={props.item.href} /> : undefined}
        className="data-[active=true]:bg-transparent"
      >
        <MdxIcon />
        <span>{props.item.name}</span>
      </SidebarMenuButton>
    );
  }

  const isCurrentPartOf = props.item.href ? isPartOf(props.item.href) : false;
  const open = isCurrentPartOf || manualOpen;
  const handleOpenChange = (next: boolean) => {
    if (!next && isCurrentPartOf) return; // keep active parents open
    setManualOpen(next);
  };

  return (
    <SidebarMenuItem>
      <Collapsible
        open={open}
        onOpenChange={handleOpenChange}
        className="group/collapsible [&>button[data-panel-open]>svg:last-child]:rotate-90"
      >
        <SidebarMenuButton
          render={props.item.href ? <Link href={props.item.href} /> : undefined}
        >
          <HugeiconsIcon
            icon={Folder01Icon}
            style={props.item.color ? { color: props.item.color } : undefined}
          />
          <span>{props.item.name}</span>
        </SidebarMenuButton>
        <CollapsibleTrigger render={<SidebarMenuAction />}>
          <span className="sr-only">Arrow menu action</span>
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            className="transition-transform"
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          {props.item.children.length === 0 ? (
            <SidebarMenuSub>
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger
                  render={
                    <SidebarMenuButton className="text-muted-foreground" />
                  }
                >
                  <HugeiconsIcon icon={Add01Icon} />
                  <span>New document</span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <CreateDocumentStep
                    collectionsData={props.collectionsData ?? []}
                    collectionId={props.item.collectionId}
                    onBack={() => setCreateOpen(false)}
                    onClose={() => setCreateOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </SidebarMenuSub>
          ) : (
            <SidebarMenuSub>
              {props.item.children.map((child) => (
                <NavTree key={child.href} item={child} />
              ))}
            </SidebarMenuSub>
          )}
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
