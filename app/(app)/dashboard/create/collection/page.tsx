import { CreateCollectionCard } from "@/app/(app)/dashboard/create/collection/create-collection-card";
import { Page } from "@/components/page-layout";

export default function CreateCollectionPage() {
  return (
    <Page
      title="Create Collection"
      description="Define the details of your new collection"
    >
      <CreateCollectionCard />
    </Page>
  );
}
