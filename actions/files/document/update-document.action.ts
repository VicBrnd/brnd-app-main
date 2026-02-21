"use server";

import { updateTag } from "next/cache";

import { and, eq } from "drizzle-orm";
import { returnValidationErrors } from "next-safe-action";

import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";
import { takeFirstOrNull } from "@/lib/db/utils";
import { compileMDX, MDXStorage } from "@/lib/mdx/mdx";
import { ActionError, authActionClient } from "@/lib/safe-action";
import { UpdateDocumentFormSchema } from "@/schemas/files/document/update-document.schema";

export const updateDocument = authActionClient
  .metadata({ actionName: "updateDocument" })
  .inputSchema(UpdateDocumentFormSchema)
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
      throw new ActionError("Collection not found or access denied.");
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
        returnValidationErrors(UpdateDocumentFormSchema, {
          slug: {
            _errors: [
              "A document with this slug already exists in this collection",
            ],
          },
        });
      }
    }

    const updateData: Record<string, string> = {};
    if (parsedInput.title) updateData.title = parsedInput.title;
    if (parsedInput.slug) updateData.slug = parsedInput.slug;
    if (parsedInput.content) {
      const compiledResult = await compileMDX(parsedInput.content);
      updateData.content = parsedInput.content;
      updateData.compiledContent = MDXStorage.serialize(compiledResult);
    }

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
