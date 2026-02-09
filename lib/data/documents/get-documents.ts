import { cacheLife, cacheTag } from "next/cache";

import { and, desc, eq, SQL } from "drizzle-orm";

import { getAuthContext } from "@/lib/auth/auth-context";
import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";

import "server-only";

export type DocumentsProps = Pick<
  typeof document.$inferSelect,
  "id" | "title" | "slug" | "isPublished" | "createdAt" | "updatedAt"
> & {
  collectionSlug: string;
  collectionTitle: string;
  collectionColor: string;
};

export async function getDocuments(
  collectionSlug?: string,
): Promise<DocumentsProps[]> {
  "use cache: private";
  cacheTag("files");
  cacheLife({ expire: 3600 });

  const ctx = await getAuthContext();

  const filters: SQL[] = [];

  filters.push(eq(collection.userId, ctx.user.id));
  if (collectionSlug) filters.push(eq(collection.slug, collectionSlug));

  const documentsData = await db
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
    .where(and(...filters))
    .orderBy(desc(document.createdAt));

  return documentsData;
}
