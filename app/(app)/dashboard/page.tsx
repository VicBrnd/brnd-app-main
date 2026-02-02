import { Suspense } from "react";

import { FileList } from "@/components/files/file-list";
import { FolderGrid } from "@/components/files/folder-grid";
import { getCollections } from "@/lib/data/get-collections";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <Suspense>
        <FolderGridAsync />
      </Suspense>
      <FileList />
    </div>
  );
}

async function FolderGridAsync() {
  const collectionsData = await getCollections();
  return <FolderGrid collectionsData={collectionsData} />;
}
