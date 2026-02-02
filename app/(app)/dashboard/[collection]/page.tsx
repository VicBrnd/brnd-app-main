import { notFound } from "next/navigation";

import CollectionHeader from "@/app/(app)/dashboard/[collection]/collection-header";
import { getCollectionBySlug } from "@/lib/data/get-collection-slug";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const collectionData = await getCollectionBySlug(collection);

  if (!collectionData) notFound();

  return <CollectionHeader collectionData={collectionData} />;
}
