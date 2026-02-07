import { Suspense } from "react";

import {
  AppCollectionGrid,
  AppCollectionGridSkeleton,
} from "@/components/files/app-collection-grid";
import {
  AppDocumentList,
  AppDocumentListSkeleton,
} from "@/components/files/app-document-list";
import { Page } from "@/components/page-layout";
import { getAuthContext } from "@/lib/auth/auth-context";
import { getCollections } from "@/lib/data/collections/get-collections";
import { getDocuments } from "@/lib/data/documents/get-documents";

export default function DashboardPage() {
  return (
    <Page
      title="All Files"
      description="Access your recent collections and documents"
    >
      <Suspense
        fallback={
          <>
            <AppCollectionGridSkeleton />
            <AppDocumentListSkeleton />
          </>
        }
      >
        <FilesAsync />
      </Suspense>
    </Page>
  );
}

async function FilesAsync() {
  const ctx = await getAuthContext();
  const [collectionsData, documentsData] = await Promise.all([
    getCollections(ctx.user.id),
    getDocuments(ctx.user.id),
  ]);

  return (
    <>
      <AppCollectionGrid collectionsData={collectionsData} />
      <AppDocumentList documentsData={documentsData} />
    </>
  );
}
