"use server";

import { updateTag } from "next/cache";

import { and, count, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";
import { authActionClient } from "@/lib/safe-action";
import { NewDocumentFormSchema } from "@/schemas/new-document.schema";

export const NewDocumentAction = authActionClient
  .metadata({ actionName: "NewDocument" })
  .inputSchema(NewDocumentFormSchema)
  .action(async ({ parsedInput, ctx: { sessionData } }) => {
    const [collectionRow] = await db
      .select({ id: collection.id, slug: collection.slug })
      .from(collection)
      .where(
        and(
          eq(collection.id, parsedInput.collection),
          eq(collection.userId, sessionData.user.id),
        ),
      )
      .limit(1);

    if (!collectionRow) {
      return { error: "Collection not found" };
    }

    const [existing] = await db
      .select({ id: document.id })
      .from(document)
      .where(
        and(
          eq(document.collectionId, collectionRow.id),
          eq(document.slug, parsedInput.slug),
        ),
      )
      .limit(1);

    if (existing) {
      return {
        error: "A document with this slug already exists in this collection",
      };
    }

    const [{ value: docCount }] = await db
      .select({ value: count() })
      .from(document)
      .where(eq(document.collectionId, collectionRow.id));

    const [newDocument] = await db
      .insert(document)
      .values({
        collectionId: collectionRow.id,
        title: parsedInput.title,
        slug: parsedInput.slug,
        content: "",
        orderIndex: docCount,
      })
      .returning();

    updateTag("documents");
    updateTag(`documents-${collectionRow.slug}`);
    updateTag("collections");
    updateTag(`collection-${collectionRow.slug}`);

    return {
      success: true,
      document: newDocument,
      collectionSlug: collectionRow.slug,
    };
  });
