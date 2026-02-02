import { cacheTag } from "next/cache";
import { unauthorized } from "next/navigation";

import { count, eq } from "drizzle-orm";

import { getSession } from "@/lib/data/get-session";
import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";

export async function getCollections() {
  const session = await getSession();

  if (!session) {
    return unauthorized();
  }

  return getCollectionsCache(session.user.id);
}

async function getCollectionsCache(userId: string) {
  "use cache";
  cacheTag("collections");

  return db
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
}
