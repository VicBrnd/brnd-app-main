import { Suspense } from "react";

import { FileList } from "@/components/files/file-list";
import { FolderGrid, FolderGridSkeleton } from "@/components/files/folder-grid";
import { DataTableSkeleton } from "@/components/ui/dice-ui/data-table-skeleton";
import { getCollections } from "@/lib/data/get-collections";
import { getDocuments } from "@/lib/data/get-documents";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <Suspense fallback={<FolderGridSkeleton />}>
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
  return <FolderGrid collectionsData={collectionsData} />;
}

async function FileListAsync() {
  const documentsData = await getDocuments();
  return <FileList documentsData={documentsData} />;
}
