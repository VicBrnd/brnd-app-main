import { Suspense } from "react";

import {
  AppCollectionGrid,
  AppCollectionGridSkeleton,
} from "@/components/files/app-collection-grid";
import { AppDocumentList } from "@/components/files/app-document-list";
import { DataTableSkeleton } from "@/components/ui/dice-ui/data-table-skeleton";
import { getAuthContext } from "@/lib/auth/auth-context";
import { getCollections } from "@/lib/data/collections/get-collections";
import { getDocuments } from "@/lib/data/documents/get-documents";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <Suspense
        fallback={
          <>
            <AppCollectionGridSkeleton />
            <DataTableSkeleton
              columnCount={5}
              withViewOptions={false}
              withPagination={false}
            />
          </>
        }
      >
        <FilesAsync />
      </Suspense>
    </div>
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
