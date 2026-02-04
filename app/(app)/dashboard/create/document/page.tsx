import { Suspense } from "react";

import { CreateDocumentCard } from "@/app/(app)/dashboard/create/document/create-document-card";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCollections } from "@/lib/data/get-collections";

export default function CreateDocumentPage() {
  return (
    <Suspense fallback={<NewDocumentCardSkeleton />}>
      <NewDocumentCardAsync />
    </Suspense>
  );
}

async function NewDocumentCardAsync() {
  const CollectionsData = await getCollections();
  return <CreateDocumentCard collectionsData={CollectionsData} />;
}

function NewDocumentCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Skeleton className="h-9 w-36 rounded-lg" />
      </CardFooter>
    </Card>
  );
}
