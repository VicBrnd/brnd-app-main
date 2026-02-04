import { Suspense } from "react";

import { AppDocumentList } from "@/components/files/app-document-list";
import {
  AppFolderGrid,
  AppFolderGridSkeleton,
} from "@/components/files/app-folder-grid";
import { DataTableSkeleton } from "@/components/ui/dice-ui/data-table-skeleton";
import { getCollections } from "@/lib/data/get-collections";
import { getDocuments } from "@/lib/data/get-documents";

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
  const collectionsData = await getCollections();
  return <AppFolderGrid collectionsData={collectionsData} />;
}

async function FileListAsync() {
  const documentsData = await getDocuments();
  return <AppDocumentList documentsData={documentsData} />;
}
