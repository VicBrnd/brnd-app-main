import { and, desc, eq, SQL } from "drizzle-orm";

import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";

export abstract class DocumentService {
  static async getAll(userId: string, collectionId?: string) {
    const filters: SQL[] = [];

    filters.push(eq(collection.userId, userId));
    if (collectionId) filters.push(eq(document.collectionId, collectionId));

    return db
      .select({
        id: document.id,
        title: document.title,
        slug: document.slug,
        isPublished: document.isPublished,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
        collectionId: collection.id,
        collectionSlug: collection.slug,
        collectionTitle: collection.title,
        collectionColor: collection.color,
      })
      .from(document)
      .innerJoin(collection, eq(document.collectionId, collection.id))
      .where(and(...filters))
      .orderBy(desc(document.createdAt));
  }
}
