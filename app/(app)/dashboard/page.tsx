import { FileList } from "@/components/files/file-list";
import { FolderGrid } from "@/components/files/folder-grid";
import { getCollections } from "@/lib/data/get-collections";

export default async function Page() {
  const collectionsData = await getCollections();

  return (
    <div className="flex flex-col gap-6">
      <FolderGrid collectionsData={collectionsData} />
      <FileList />
    </div>
  );
}
