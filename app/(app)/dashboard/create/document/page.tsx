import { CreateDocumentCard } from "@/app/(app)/dashboard/create/document/create-document-card";
import { Page } from "@/components/page-layout";
import { getAuthContext } from "@/lib/auth/auth-context";
import { getCollections } from "@/lib/data/collections/get-collections";

export default async function CreateDocumentPage() {
  const ctx = await getAuthContext();
  const collectionsData = await getCollections(ctx.user.id);

  return (
    <Page
      title="Create Document"
      description="Define the details of your new document"
    >
      <CreateDocumentCard collectionsData={collectionsData} />
    </Page>
  );
}
