import { cacheLife, cacheTag } from "next/cache";

import { and, eq } from "drizzle-orm";

import { getAuthContext } from "@/lib/auth/auth-context";
import { CollectionsProps } from "@/lib/data/collections/get-collections";
import { DocumentsProps } from "@/lib/data/documents/get-documents";
import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";

import "server-only";

export type DocumentBySlugProps = Pick<
  typeof document.$inferSelect,
  | "id"
  | "title"
  | "slug"
  | "content"
  | "compiledContent"
  | "isPublished"
  | "createdAt"
  | "updatedAt"
> & {
  collectionId: CollectionsProps["id"];
  collectionSlug: CollectionsProps["slug"];
  collectionTitle: CollectionsProps["title"];
  collectionColor: CollectionsProps["color"];
};

export async function getDocumentBySlug(
  collectionSlug: CollectionsProps["slug"],
  documentSlug: DocumentsProps["slug"],
): Promise<DocumentBySlugProps | undefined> {
  "use cache: private";
  cacheTag("files");
  cacheLife({ expire: 3600 });

  const ctx = await getAuthContext();

  const [documentSlugData] = await db
    .select({
      id: document.id,
      title: document.title,
      slug: document.slug,
      content: document.content,
      compiledContent: document.compiledContent,
      isPublished: document.isPublished,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
      collectionId: collection.id,
      collectionSlug: collection.slug,
      collectionTitle: collection.title,
      collectionColor: collection.color,
    })
    .from(document)
    .innerJoin(collection, eq(collection.id, document.collectionId))
    .where(
      and(
        eq(collection.userId, ctx.user.id),
        eq(collection.slug, collectionSlug),
        eq(document.slug, documentSlug),
      ),
    );

  return documentSlugData;
}
