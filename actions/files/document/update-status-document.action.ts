"use server";

import { updateTag } from "next/cache";

import { and, eq, inArray, not } from "drizzle-orm";
import { z } from "zod/v4";

import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";
import { authActionClient } from "@/lib/safe-action";

export const updateStatusDocument = authActionClient
  .metadata({ actionName: "UpdateStatusDocument" })
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx: { sessionData } }) => {
    const [doc] = await db
      .select({
        id: document.id,
        slug: document.slug,
        isPublished: document.isPublished,
        collectionId: document.collectionId,
        collectionSlug: collection.slug,
      })
      .from(document)
      .innerJoin(collection, eq(document.collectionId, collection.id))
      .where(
        and(
          eq(document.id, parsedInput.id),
          eq(collection.userId, sessionData.user.id),
        ),
      )
      .limit(1);

    if (!doc) {
      return { error: "Document not found" };
    }

    const userCollections = db
      .select({ id: collection.id })
      .from(collection)
      .where(eq(collection.userId, sessionData.user.id));

    const [updated] = await db
      .update(document)
      .set({ isPublished: not(document.isPublished) })
      .where(
        and(
          eq(document.id, parsedInput.id),
          inArray(document.collectionId, userCollections),
        ),
      )
      .returning({ isPublished: document.isPublished });

    updateTag("files");

    return { success: true, isPublished: updated.isPublished };
  });
