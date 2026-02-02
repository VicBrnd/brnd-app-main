import { cacheTag } from "next/cache";
import { unauthorized } from "next/navigation";

import { and, count, eq } from "drizzle-orm";

import { getSession } from "@/lib/data/get-session";
import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";

export async function getCollectionBySlug(slug: string) {
  const session = await getSession();

  if (!session) {
    return unauthorized();
  }

  return getCollectionBySlugCache(session.user.id, slug);
}

async function getCollectionBySlugCache(userId: string, slug: string) {
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
