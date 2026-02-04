import { Suspense } from "react";

import Link from "next/link";
import { notFound } from "next/navigation";

import { Folder01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { CollectionHeader } from "@/app/(app)/dashboard/[collection]/collection-header";
import { AppDocumentList } from "@/components/files/app-document-list";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTableSkeleton } from "@/components/ui/dice-ui/data-table-skeleton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getCollectionBySlug } from "@/lib/data/get-collection-slug";
import { getDocuments } from "@/lib/data/get-documents";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const collectionData = await getCollectionBySlug(collection);

  if (!collectionData) notFound();

  return (
    <>
      <CollectionHeader collectionData={collectionData} />

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
            <EmptyContent className="flex-row justify-center gap-2">
              <Button
                nativeButton={false}
                variant="outline"
                render={<Link href="/dashboard/create/document" />}
              >
                New Document
              </Button>
            </EmptyContent>
          </Empty>
        </Card>
      ) : (
        <Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              withViewOptions={false}
              withPagination={false}
            />
          }
        >
          <FileListAsync collectionSlug={collection} />
        </Suspense>
      )}
    </>
  );
}

async function FileListAsync({ collectionSlug }: { collectionSlug: string }) {
  const documentsData = await getDocuments(collectionSlug);
  return <AppDocumentList documentsData={documentsData} />;
}
