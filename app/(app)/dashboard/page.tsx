import { Suspense } from "react";

import {
  AppCollectionCard,
  AppCollectionCardSkeleton,
} from "@/components/files/collection/app-collection-card";
import {
  AppDocumentList,
  AppDocumentListSkeleton,
} from "@/components/files/document/app-document-list";
import { Page } from "@/components/page-layout";
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
            <AppCollectionCardSkeleton />
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
  const [collectionsData, documentsData] = await Promise.all([
    getCollections(),
    getDocuments(),
  ]);

  return (
    <>
      <AppCollectionCard collectionsData={collectionsData} />
      <AppDocumentList documentsData={documentsData} />
    </>
  );
}
