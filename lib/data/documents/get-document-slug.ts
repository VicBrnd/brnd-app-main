import { cacheTag } from "next/cache";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";

import "server-only";

export type DocumentBySlugProps = Pick<
  typeof document.$inferSelect,
  "id" | "title" | "slug" | "isPublished" | "createdAt" | "updatedAt"
> & {
  collectionSlug: string;
  collectionTitle: string;
  collectionColor: string;
};

export async function getDocumentBySlug(
  userId: string,
  collectionSlug: string,
  documentSlug: string,
): Promise<DocumentBySlugProps | undefined> {
  "use cache";
  cacheTag("files");

  const [documentSlugData] = await db
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

  return documentSlugData;
}
