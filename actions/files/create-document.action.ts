"use server";

import { updateTag } from "next/cache";

import { and, count, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";
import { authActionClient } from "@/lib/safe-action";
import { CreateDocumentFormSchema } from "@/schemas/files/create-document.schema";

export const createDocument = authActionClient
  .metadata({ actionName: "createDocument" })
  .inputSchema(CreateDocumentFormSchema)
  .action(async ({ parsedInput, ctx: { sessionData } }) => {
    const [collectionData] = await db
      .select({ id: collection.id, slug: collection.slug })
      .from(collection)
      .where(
        and(
          eq(collection.id, parsedInput.collection),
          eq(collection.userId, sessionData.user.id),
        ),
      )
      .limit(1);

    if (!collectionData) {
      return { error: "Collection not found" };
    }

    const [verifySlug] = await db
      .select({ id: document.id })
      .from(document)
      .where(
        and(
          eq(document.collectionId, collectionData.id),
          eq(document.slug, parsedInput.slug),
        ),
      )
      .limit(1);

    if (verifySlug) {
      return {
        error: "A document with this slug already exists in this collection",
      };
    }

    const [{ value: docCount }] = await db
      .select({ value: count() })
      .from(document)
      .where(eq(document.collectionId, collectionData.id));

    const [newDocument] = await db
      .insert(document)
      .values({
        collectionId: collectionData.id,
        title: parsedInput.title,
        slug: parsedInput.slug,
        content: "",
        orderIndex: docCount,
      })
      .returning();

    updateTag("documents");
    updateTag(`documents-${collectionData.slug}`);
    updateTag(`collection-${collectionData.slug}`);

    return {
      success: true,
      document: newDocument,
      collectionSlug: collectionData.slug,
    };
  });
