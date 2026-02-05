import { cacheTag } from "next/cache";

import { count, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";

import "server-only";

export type CollectionsProps = Pick<
  typeof collection.$inferSelect,
  "id" | "userId" | "title" | "slug" | "color" | "createdAt" | "updatedAt"
> & {
  filesCount: number;
};

export async function getCollections(
  userId: string,
): Promise<CollectionsProps[]> {
  "use cache";
  cacheTag("collections");

  const collectionData = await db
    .select({
      id: collection.id,
      userId: collection.userId,
      title: collection.title,
      slug: collection.slug,
      color: collection.color,
      createdAt: collection.createdAt,
      updatedAt: collection.updatedAt,
      filesCount: count(document.id),
    })
    .from(collection)
    .leftJoin(document, eq(document.collectionId, collection.id))
    .where(eq(collection.userId, userId))
    .groupBy(collection.id);

  return collectionData;
}
