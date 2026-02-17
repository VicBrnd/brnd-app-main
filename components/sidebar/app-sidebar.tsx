import { Suspense } from "react";

import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { CreateDialog } from "@/components/files/create/create-dialog";
import { NavHeader } from "@/components/sidebar/nav-header";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavTree, NavTreeSkeleton } from "@/components/sidebar/nav-tree";
import { NavUser, NavUserSkeleton } from "@/components/sidebar/nav-user";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { data } from "@/config/dashboard.config";
import { getAuthContext } from "@/lib/auth/auth-context";
import { getCollections } from "@/lib/data/collections/get-collections";
import { getDocuments } from "@/lib/data/documents/get-documents";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <NavHeader />
      <SidebarContent>
        {/* Top of the sidebar */}
        <NavMain
          items={data.navMain}
          AppFilesDialog={
            <Suspense
              fallback={
                <Button
                  size="icon"
                  className="size-8 group-data-[collapsible=icon]:opacity-0"
                  variant="outline"
                >
                  <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
                  <span className="sr-only">Quick Create</span>
                </Button>
              }
            >
              <AppFilesDialogAsync />
            </Suspense>
          }
        />
        {/* Collections and Documents */}
        <Suspense fallback={<NavTreeSkeleton />}>
          <NavTreeAsync />
        </Suspense>

        {/* Other sidebar items */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      {/* Sidebar User info */}
      <SidebarFooter>
        <Suspense fallback={<NavUserSkeleton />}>
          <NavUserAsync />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}

async function NavTreeAsync() {
  const [collections, documents] = await Promise.all([
    getCollections(),
    getDocuments(),
  ]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Files</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {collections.map((collection) => (
            <NavTree
              key={collection.id}
              item={{
                name: collection.title,
                href: `/dashboard/${collection.slug}`,
                color: collection.color,
                children: documents
                  .filter((document) => document.collectionId === collection.id)
                  .map((document) => ({
                    name: document.title,
                    href: `/dashboard/${collection.slug}/${document.slug}`,
                  })),
              }}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

async function AppFilesDialogAsync() {
  const collectionsData = await getCollections();
  return <CreateDialog collectionsData={collectionsData} />;
}

async function NavUserAsync() {
  const ctx = await getAuthContext();
  return <NavUser user={ctx.user} />;
}
