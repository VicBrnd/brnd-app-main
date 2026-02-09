"use server";

import { updateTag } from "next/cache";

import { and, eq } from "drizzle-orm";

import { getDocumentCount } from "@/lib/data/documents/get-document-count";
import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";
import { takeFirstOrNull, takeFirstOrThrow } from "@/lib/db/utils";
import { authActionClient } from "@/lib/safe-action";
import { CreateDocumentFormSchema } from "@/schemas/files/create-document.schema";

export const createDocument = authActionClient
  .metadata({ actionName: "createDocument" })
  .inputSchema(CreateDocumentFormSchema)
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

    const duplicateSlug = await db
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

    if (duplicateSlug) {
      return {
        error: "A document with this slug already exists in this collection.",
      };
    }

    const documentCount = await getDocumentCount(parsedCollection.id);

    const newDocument = await db
      .insert(document)
      .values({
        collectionId: parsedCollection.id,
        title: parsedInput.title,
        slug: parsedInput.slug,
        content: "",
        orderIndex: documentCount,
      })
      .returning()
      .then(takeFirstOrThrow);

    updateTag("files");

    return {
      success: true,
      document: newDocument,
      collection: parsedCollection,
    };
  });
