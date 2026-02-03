import { cacheTag } from "next/cache";
import { unauthorized } from "next/navigation";

import { and, desc, eq } from "drizzle-orm";

import { getSession } from "@/lib/data/get-session";
import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";

import "server-only";

async function getDocumentsCache(userId: string, collectionSlug?: string) {
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

export async function getDocuments(collectionSlug?: string) {
  const session = await getSession();

  if (!session) {
    return unauthorized();
  }

  return getDocumentsCache(session.user.id, collectionSlug);
}
