import { Suspense } from "react";

import {
  CollectionCard,
  CollectionCardSkeleton,
} from "@/components/files/collection/collection-card";
import {
  DocumentTable,
  DocumentTableSkeleton,
} from "@/components/files/document/document-table/document-table";
import { AppPageLayout } from "@/components/layout/app-page-layout";
import { getCollections } from "@/lib/data/collections/get-collections";
import { getDocuments } from "@/lib/data/documents/get-documents";

export default function DashboardPage() {
  return (
    <AppPageLayout
      title="All Files"
      description="Access your recent collections and documents"
    >
      <Suspense
        fallback={
          <>
            <CollectionCardSkeleton />
            <DocumentTableSkeleton />
          </>
        }
      >
        <FilesAsync />
      </Suspense>
    </AppPageLayout>
  );
}

async function FilesAsync() {
  const [collectionsData, documentsData] = await Promise.all([
    getCollections(),
    getDocuments(),
  ]);

  return (
    <>
      <CollectionCard collectionsData={collectionsData} />
      <DocumentTable
        collectionsData={collectionsData}
        documentsData={documentsData}
      />
    </>
  );
}
