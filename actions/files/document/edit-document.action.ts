"use server";

import { updateTag } from "next/cache";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";
import { takeFirstOrNull } from "@/lib/db/utils";
import { authActionClient } from "@/lib/safe-action";
import { EditDocumentFormSchema } from "@/schemas/files/document/edit-document.schema";

export const editDocument = authActionClient
  .metadata({ actionName: "editDocument" })
  .inputSchema(EditDocumentFormSchema)
  .action(async ({ parsedInput, ctx: { sessionData } }) => {
    const parsedCollection = await db
      .select({ id: collection.id, slug: collection.slug })
      .from(collection)
      .where(
        and(
          eq(collection.id, parsedInput.collection),
          eq(collection.userId, sessionData.user.id),
        ),
      )
      .limit(1)
      .then(takeFirstOrNull);

    if (!parsedCollection) {
      return { error: "Collection not found or access denied." };
    }

    if (parsedInput.slug) {
      const duplicateDocumentSlug = await db
        .select({ id: document.id })
        .from(document)
        .where(
          and(
            eq(document.collectionId, parsedCollection.id),
            eq(document.slug, parsedInput.slug),
          ),
        )
        .limit(1)
        .then(takeFirstOrNull);

      if (duplicateDocumentSlug) {
        return {
          error: "A document with this slug already exists in this collection.",
        };
      }
    }

    const updateData: Record<string, string> = {};
    if (parsedInput.title) updateData.title = parsedInput.title;
    if (parsedInput.slug) updateData.slug = parsedInput.slug;

    await db
      .update(document)
      .set(updateData)
      .where(
        and(
          eq(document.id, parsedInput.id),
          eq(document.collectionId, parsedCollection.id),
        ),
      );

    updateTag("files");

    return { success: true };
  });
