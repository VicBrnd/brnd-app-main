import Link from "next/link";
import { notFound } from "next/navigation";

import { Folder01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import CollectionHeader from "@/app/(app)/dashboard/[collection]/collection-header";
import { FileList } from "@/components/files/file-list";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getCollectionBySlug } from "@/lib/data/get-collection-slug";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const collectionData = await getCollectionBySlug(collection);

  if (!collectionData) notFound();

  if (collectionData.filesCount === 0) {
    return (
      <div>
        <CollectionHeader collectionData={collectionData} />
        <Card>
          <Empty className="flex flex-col justify-center items-center">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <HugeiconsIcon icon={Folder01Icon} />
              </EmptyMedia>
              <EmptyTitle>No Document Yet</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t created any documents yet. Get started by
                creating your first collection.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <Button
                nativeButton={false}
                variant="outline"
                render={<Link href="/dashboard/new/document" />}
              >
                New Document
              </Button>
            </EmptyContent>
          </Empty>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <CollectionHeader collectionData={collectionData} />
      <FileList />
    </div>
  );
}
