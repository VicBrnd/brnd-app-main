import { Suspense } from "react";

import { AppDocumentList } from "@/components/files/app-document-list";
import {
  AppFolderGrid,
  AppFolderGridSkeleton,
} from "@/components/files/app-folder-grid";
import { DataTableSkeleton } from "@/components/ui/dice-ui/data-table-skeleton";
import { getAuthContext } from "@/lib/auth/auth-context";
import { getCollections } from "@/lib/data/collections/get-collections";
import { getDocuments } from "@/lib/data/documents/get-documents";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<AppFolderGridSkeleton />}>
        <FolderGridAsync />
      </Suspense>
      <Suspense
        fallback={
          <DataTableSkeleton
            columnCount={5}
            withViewOptions={false}
            withPagination={false}
          />
        }
      >
        <FileListAsync />
      </Suspense>
    </div>
  );
}

async function FolderGridAsync() {
  const ctx = await getAuthContext();

  const collectionsData = await getCollections(ctx.user.id);
  return <AppFolderGrid collectionsData={collectionsData} />;
}

async function FileListAsync() {
  const ctx = await getAuthContext();

  const documentsData = await getDocuments(ctx.user.id);
  return <AppDocumentList documentsData={documentsData} />;
}
