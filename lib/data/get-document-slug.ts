import { cacheTag } from "next/cache";
import { unauthorized } from "next/navigation";

import { and, eq } from "drizzle-orm";

import { getSession } from "@/lib/data/get-session";
import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";

import "server-only";

async function getDocumentBySlugCache(
  userId: string,
  collectionSlug: string,
  documentSlug: string,
) {
  "use cache";
  cacheTag(`document-${collectionSlug}-${documentSlug}`);

  const [result] = await db
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
    .innerJoin(collection, eq(collection.id, document.collectionId))
    .where(
      and(
        eq(collection.userId, userId),
        eq(collection.slug, collectionSlug),
        eq(document.slug, documentSlug),
      ),
    );

  return result ?? null;
}

export async function getDocumentBySlug(
  collectionSlug: string,
  documentSlug: string,
) {
  const session = await getSession();

  if (!session) {
    return unauthorized();
  }

  return getDocumentBySlugCache(session.user.id, collectionSlug, documentSlug);
}
