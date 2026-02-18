import { CollectionList } from "@/app/(app)/docs/collection-list";
import { AppPageLayout } from "@/components/layout/app-page-layout";
import { getCollections } from "@/lib/data/collections/get-collections";

export default async function namePage() {
  const collectionsData = await getCollections();
  return (
    <AppPageLayout
      title="Documentation"
      description="Browse and read your collections"
    >
      <CollectionList collectionsData={collectionsData} />
    </AppPageLayout>
  );
}
