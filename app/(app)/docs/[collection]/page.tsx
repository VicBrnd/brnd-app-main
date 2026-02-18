import { notFound } from "next/navigation";

import { DocumentList } from "@/app/(app)/docs/[collection]/document-list";
import { AppPageLayout } from "@/components/layout/app-page-layout";
import { getCollectionBySlug } from "@/lib/data/collections/get-collection-slug";
import { getDocuments } from "@/lib/data/documents/get-documents";

export default async function CollectionPage(
  props: PageProps<"/docs/[collection]">,
) {
  const { collection } = await props.params;

  const collectionData = await getCollectionBySlug(collection);

  if (!collectionData) {
    notFound();
  }

  const documentsData = await getDocuments(collectionData.id);

  return (
    <AppPageLayout
      title={collectionData.title}
      description="Explore documents in this collection"
    >
      <DocumentList documentsData={documentsData} />
    </AppPageLayout>
  );
}
