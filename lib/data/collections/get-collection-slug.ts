import { cacheTag } from "next/cache";

import { and, count, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";

import "server-only";

export async function getCollectionBySlug(userId: string, slug: string) {
  "use cache";
  cacheTag(`collection-${slug}`);

  const [result] = await db
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
    .where(and(eq(collection.userId, userId), eq(collection.slug, slug)))
    .groupBy(collection.id);

  return result ?? null;
}
