import { notFound } from "next/navigation";

import { CollectionHeader } from "@/components/files/collection/collection-header";
import { DocumentEmpty } from "@/components/files/document/document-empty";
import { DocumentTable } from "@/components/files/document/document-table/document-table";
import { AppPageLayout } from "@/components/layout/app-page-layout";
import { Card } from "@/components/ui/card";
import { getCollectionBySlug } from "@/lib/data/collections/get-collection-slug";
import {
  CollectionsProps,
  getCollections,
} from "@/lib/data/collections/get-collections";
import { getDocuments } from "@/lib/data/documents/get-documents";

export default async function CollectionPage(
  props: PageProps<"/dashboard/[collection]">,
) {
  const { collection } = await props.params;

  const collectionData = await getCollectionBySlug(collection);

  if (!collectionData) {
    notFound();
  }

  return (
    <>
      <CollectionHeader collectionData={collectionData} />
      <AppPageLayout
        title="Overview"
        description="View, edit, and manage the documents in this collection"
      >
        {collectionData.filesCount === 0 ? (
          <Card>
            <DocumentEmpty />
          </Card>
        ) : (
          <DocumentTableAsync collectionId={collectionData.id} />
        )}
      </AppPageLayout>
    </>
  );
}

async function DocumentTableAsync(props: {
  collectionId: CollectionsProps["id"];
}) {
  const documentsData = await getDocuments(props.collectionId);
  const collectionData = await getCollections();
  return (
    <DocumentTable
      documentsData={documentsData}
      collectionsData={collectionData}
    />
  );
}
