import { Suspense } from "react";

import NewDocumentCard from "@/app/(app)/dashboard/new/document/new-document-card";
import { getCollections } from "@/lib/data/get-collections";

export default function Page() {
  return (
    <Suspense>
      <NewDocumentCardAsync />
    </Suspense>
  );
}

async function NewDocumentCardAsync() {
  const CollectionsData = await getCollections();
  return <NewDocumentCard collectionsData={CollectionsData} />;
}
