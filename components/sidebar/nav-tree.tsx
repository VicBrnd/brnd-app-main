"use client";

import type { CollectionsProps } from "@/lib/data/collections/get-collections";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Add01Icon,
  ArrowRight01Icon,
  Folder01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { goeyToast } from "goey-toast";

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
import { DocumentsProps } from "@/lib/data/documents/get-documents";

export function NavTree(props: {
  collectionsData: CollectionsProps[];
  documentsData: DocumentsProps[];
}) {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {props.collectionsData.map((collection) => (
        <SidebarMenuItem key={collection.id}>
          <Collapsible className="group/collapsible [&>button[data-panel-open]>svg:last-child]:rotate-90">
            <SidebarMenuButton
              className="data-[active=true]:bg-transparent"
              render={<Link href={`/dashboard/${collection.slug}`} />}
              isActive={
                pathname === `/dashboard/${collection.slug}` ||
                pathname.startsWith(`/dashboard/${collection.slug}/`)
              }
            >
              <HugeiconsIcon
                icon={Folder01Icon}
                style={{ color: collection.color }}
              />
              <span>{collection.title}</span>
            </SidebarMenuButton>
            <CollapsibleTrigger render={<SidebarMenuAction />}>
              <span className="sr-only">Arrow menu action</span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="transition-transform"
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              {(() => {
                const documents = props.documentsData.filter(
                  (document) => document.collectionId === collection.id,
                );
                if (documents.length === 0)
                  return (
                    <SidebarMenuSub>
                      <SidebarMenuButton
                        className="data-[active=true]:bg-transparent"
                        onClick={() => goeyToast.info("Work in progress")}
                      >
                        <HugeiconsIcon icon={Add01Icon} />
                        <span>Create Document</span>
                      </SidebarMenuButton>
                    </SidebarMenuSub>
                  );
                return (
                  <SidebarMenuSub>
                    {documents.map((document) => (
                      <SidebarMenuButton
                        key={document.id}
                        className="data-[active=true]:bg-transparent"
                        render={
                          <Link
                            href={`/dashboard/${collection.slug}/${document.slug}`}
                          />
                        }
                        isActive={
                          pathname ===
                          `/dashboard/${collection.slug}/${document.slug}`
                        }
                      >
                        <MdxIcon />
                        <span>{document.title}</span>
                      </SidebarMenuButton>
                    ))}
                  </SidebarMenuSub>
                );
              })()}
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
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
