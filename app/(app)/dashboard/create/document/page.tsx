import { CreateDocumentCard } from "@/app/(app)/dashboard/create/document/create-document-card";
import { getAuthContext } from "@/lib/auth/auth-context";
import { getCollections } from "@/lib/data/collections/get-collections";

export default async function CreateDocumentPage() {
  const ctx = await getAuthContext();
  const collectionsData = await getCollections(ctx.user.id);

  return <CreateDocumentCard collectionsData={collectionsData} />;
}
