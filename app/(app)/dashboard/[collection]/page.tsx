import { notFound } from "next/navigation";

import { Folder01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { CollectionHeader } from "@/components/files/collection/collection-header";
import { AppDocumentTable } from "@/components/files/document/app-document-table";
import { Page } from "@/components/layout/page-layout";
import { Card } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getCollectionBySlug } from "@/lib/data/collections/get-collection-slug";
import { getCollections } from "@/lib/data/collections/get-collections";
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
      <Page
        title="Overview"
        description="View, edit, and manage the documents in this collection"
      >
        {collectionData.filesCount === 0 ? (
          <Card>
            <Empty className="flex flex-col justify-center items-center">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <HugeiconsIcon icon={Folder01Icon} />
                </EmptyMedia>
                <EmptyTitle>No Document Yet</EmptyTitle>
                <EmptyDescription>
                  You haven&apos;t created any documents yet. Get started by
                  creating your first document.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </Card>
        ) : (
          <FileListAsync collectionSlug={collection} />
        )}
      </Page>
    </>
  );
}

async function FileListAsync({ collectionSlug }: { collectionSlug: string }) {
  const documentsData = await getDocuments(collectionSlug);
  const collectionData = await getCollections();
  return (
    <AppDocumentTable
      documentsData={documentsData}
      collectionsData={collectionData}
    />
  );
}
