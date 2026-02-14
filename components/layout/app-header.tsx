import { Suspense } from "react";

import {
  AppBreadcrumb,
  AppBreadcrumbSkeleton,
} from "@/components/breadcrumb/app-breadcrumb";
import {
  CollectionHeader,
  CollectionHeaderSkeleton,
} from "@/components/files/collection/collection-header";
import {
  DocumentHeader,
  DocumentHeaderSkeleton,
} from "@/components/files/document/document-header";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getCollectionBySlug } from "@/lib/data/collections/get-collection-slug";
import { getCollections } from "@/lib/data/collections/get-collections";
import { getDocumentBySlug } from "@/lib/data/documents/get-document-slug";
import { getDocuments } from "@/lib/data/documents/get-documents";

interface AppHeaderProps {
  collectionSlug?: string;
  documentSlug?: string;
}

export function AppHeader({ collectionSlug, documentSlug }: AppHeaderProps) {
  return (
    <>
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 min-w-0 flex-1">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 hidden md:block data-[orientation=vertical]:h-4"
          />
          <div className="hidden md:block min-w-0 flex-1">
            <Suspense fallback={<AppBreadcrumbSkeleton />}>
              <AppBreadcrumbAsync />
            </Suspense>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      <div className="flex md:hidden items-center border-b px-4 py-2 overflow-x-auto overflow-y-hidden">
        <Suspense fallback={<AppBreadcrumbSkeleton />}>
          <AppBreadcrumbAsync />
        </Suspense>
      </div>
      {documentSlug && collectionSlug ? (
        <Suspense fallback={<DocumentHeaderSkeleton />}>
          <DocumentHeaderAsync
            collectionSlug={collectionSlug}
            documentSlug={documentSlug}
          />
        </Suspense>
      ) : collectionSlug ? (
        <Suspense fallback={<CollectionHeaderSkeleton />}>
          <CollectionHeaderAsync collectionSlug={collectionSlug} />
        </Suspense>
      ) : null}
    </>
  );
}

async function CollectionHeaderAsync({
  collectionSlug,
}: {
  collectionSlug: string;
}) {
  const collectionData = await getCollectionBySlug(collectionSlug);
  if (!collectionData) return null;
  return <CollectionHeader collectionData={collectionData} />;
}

async function DocumentHeaderAsync({
  collectionSlug,
  documentSlug,
}: {
  collectionSlug: string;
  documentSlug: string;
}) {
  const documentData = await getDocumentBySlug(collectionSlug, documentSlug);
  if (!documentData) return null;
  return <DocumentHeader documentData={documentData} />;
}

async function AppBreadcrumbAsync() {
  const [collectionsData, documentsData] = await Promise.all([
    getCollections(),
    getDocuments(),
  ]);

  return (
    <AppBreadcrumb
      collectionsData={collectionsData}
      documentsData={documentsData}
    />
  );
}
