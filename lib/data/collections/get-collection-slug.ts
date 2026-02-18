import { cacheLife, cacheTag } from "next/cache";

import { and, count, eq } from "drizzle-orm";

import { getAuthContext } from "@/lib/auth/auth-context";
import { CollectionsProps } from "@/lib/data/collections/get-collections";
import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";

import "server-only";

type CollectionBySlugProps = Pick<
  typeof collection.$inferSelect,
  "id" | "userId" | "title" | "slug" | "color" | "createdAt" | "updatedAt"
> & {
  filesCount: number;
};

export async function getCollectionBySlug(
  collectionSlug: CollectionsProps["slug"],
): Promise<CollectionBySlugProps | undefined> {
  "use cache: private";
  cacheTag("files");
  cacheLife({ expire: 3600 });

  const ctx = await getAuthContext();

  const [collectionSlugData] = await db
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
    .where(
      and(
        eq(collection.userId, ctx.user.id),
        eq(collection.slug, collectionSlug),
      ),
    )
    .groupBy(collection.id);

  return collectionSlugData;
}
