import { Suspense } from "react";

import { AppFilesDialog } from "@/components/files/create/app-files-dialog";
import { NavHeader } from "@/components/sidebar/nav-header";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavTree } from "@/components/sidebar/nav-tree";
import { NavUser, NavUserSkeleton } from "@/components/sidebar/nav-user";
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
        <NavMain
          items={data.navMain}
          AppFilesDialog={
            <Suspense>
              <NavMainAppFilesDialog />
            </Suspense>
          }
        />
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <NavTreeAsync />
        </Suspense>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<NavUserSkeleton />}>
          <UserSidebarAsync />
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

async function NavMainAppFilesDialog() {
  const collectionsData = await getCollections();
  return <AppFilesDialog collectionsData={collectionsData} />;
}

async function UserSidebarAsync() {
  const ctx = await getAuthContext();
  return <NavUser user={ctx.user} />;
}
