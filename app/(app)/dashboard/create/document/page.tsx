import { Suspense } from "react";

import {
  CreateDocumentCard,
  CreateDocumentSkeleton,
} from "@/app/(app)/dashboard/create/document/create-document-card";
import { Page } from "@/components/page-layout";
import { getAuthContext } from "@/lib/auth/auth-context";
import { getCollections } from "@/lib/data/collections/get-collections";

export default function CreateDocumentPage() {
  return (
    <Page
      title="Create Document"
      description="Define the details of your new document"
    >
      <Suspense fallback={<CreateDocumentSkeleton />}>
        <CreateDocumentAsync />
      </Suspense>
    </Page>
  );
}

export async function CreateDocumentAsync() {
  const ctx = await getAuthContext();
  const collectionsData = await getCollections(ctx.user.id);

  return <CreateDocumentCard collectionsData={collectionsData} />;
}
