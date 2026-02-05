import { cacheTag } from "next/cache";

import { and, desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";

import "server-only";

export async function getDocuments(userId: string, collectionSlug?: string) {
  "use cache";
  cacheTag(collectionSlug ? `documents-${collectionSlug}` : "documents");

  const conditions = [eq(collection.userId, userId)];

  if (collectionSlug) {
    conditions.push(eq(collection.slug, collectionSlug));
  }

  return db
    .select({
      id: document.id,
      title: document.title,
      slug: document.slug,
      isPublished: document.isPublished,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
      collectionSlug: collection.slug,
      collectionTitle: collection.title,
      collectionColor: collection.color,
    })
    .from(document)
    .innerJoin(collection, eq(document.collectionId, collection.id))
    .where(and(...conditions))
    .orderBy(desc(document.createdAt));
}
