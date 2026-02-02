import { Suspense } from "react";

import { FileList } from "@/components/files/file-list";
import { FolderGrid, FolderGridSkeleton } from "@/components/files/folder-grid";
import { getCollections } from "@/lib/data/get-collections";
import { getDocuments } from "@/lib/data/get-documents";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<FolderGridSkeleton />}>
        <FolderGridAsync />
      </Suspense>
      <Suspense fallback={<div>Load...</div>}>
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
