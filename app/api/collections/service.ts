import { and, count, eq, inArray, ne } from "drizzle-orm";

import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";
import { takeFirstOrNull, takeFirstOrThrow } from "@/lib/db/utils";

export abstract class CollectionService {
  static async getAll(userId: string) {
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

  static async create(userId: string, data: { title: string; slug: string }) {
    const duplicate = await db
      .select({ id: collection.id })
      .from(collection)
      .where(
        and(
          eq(collection.slug, data.slug),
          eq(collection.userId, userId),
        ),
      )
      .limit(1)
      .then(takeFirstOrNull);

    if (duplicate) {
      throw new Error("A collection with this slug already exists.");
    }

    return db
      .insert(collection)
      .values({
        title: data.title,
        slug: data.slug,
        userId,
      })
      .returning()
      .then(takeFirstOrThrow);
  }

  static async edit(
    userId: string,
    data: { id: string; title: string; slug: string; color: string },
  ) {
    const duplicate = await db
      .select({ id: collection.id })
      .from(collection)
      .where(
        and(
          eq(collection.slug, data.slug),
          ne(collection.id, data.id),
          eq(collection.userId, userId),
        ),
      )
      .limit(1)
      .then(takeFirstOrNull);

    if (duplicate) {
      throw new Error("A collection with this slug already exists.");
    }

    await db
      .update(collection)
      .set({
        title: data.title,
        slug: data.slug,
        color: data.color,
      })
      .where(
        and(
          eq(collection.id, data.id),
          eq(collection.userId, userId),
        ),
      );
  }

  static async delete(userId: string, ids: string[]) {
    const hasDocuments = await db
      .select({ id: document.id })
      .from(document)
      .innerJoin(collection, eq(document.collectionId, collection.id))
      .where(
        and(
          inArray(document.collectionId, ids),
          eq(collection.userId, userId),
        ),
      )
      .limit(1)
      .then(takeFirstOrNull);

    if (hasDocuments) {
      throw new Error("Delete documents before deleting the collection.");
    }

    await db
      .delete(collection)
      .where(
        and(
          inArray(collection.id, ids),
          eq(collection.userId, userId),
        ),
      );
  }
}
