import { CreateCollectionCard } from "@/app/(app)/dashboard/create/collection/create-collection-card";
import { Page } from "@/components/page-layout";
import { getAuthContext } from "@/lib/auth/auth-context";

export default async function CreateCollectionPage() {
  await getAuthContext();
  return (
    <Page
      title="Create Collection"
      description="Define the details of your new collection"
    >
      <CreateCollectionCard />
    </Page>
  );
}
