"use server";

import { updateTag } from "next/cache";
import { unauthorized } from "next/navigation";

import { and, count, eq } from "drizzle-orm";
import { z } from "zod";

import { getSession } from "@/lib/data/get-session";
import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";
import { NewDocumentFormSchema } from "@/schemas/new-document.schema";

export async function NewDocumentAction(formData: FormData) {
  const session = await getSession();

  if (!session) {
    return unauthorized();
  }
  try {
    const validatedData = NewDocumentFormSchema.parse({
      title: formData.get("title"),
      slug: formData.get("slug"),
      collection: formData.get("collection"),
    });

    // Verify the collection belongs to the user
    const [collectionRow] = await db
      .select({ id: collection.id, slug: collection.slug })
      .from(collection)
      .where(
        and(
          eq(collection.id, validatedData.collection),
          eq(collection.userId, session.user.id),
        ),
      )
      .limit(1);

    if (!collectionRow) {
      return { error: "Collection not found" };
    }

    // Check for duplicate slug within the collection
    const [existing] = await db
      .select({ id: document.id })
      .from(document)
      .where(
        and(
          eq(document.collectionId, collectionRow.id),
          eq(document.slug, validatedData.slug),
        ),
      )
      .limit(1);

    if (existing) {
      return {
        error: "A document with this slug already exists in this collection",
      };
    }

    // Get next orderIndex
    const [{ value: docCount }] = await db
      .select({ value: count() })
      .from(document)
      .where(eq(document.collectionId, collectionRow.id));

    const [newDocument] = await db
      .insert(document)
      .values({
        collectionId: collectionRow.id,
        title: validatedData.title,
        slug: validatedData.slug,
        content: "",
        orderIndex: docCount,
      })
      .returning();

    updateTag("documents");
    updateTag("collections");
    updateTag(`collection-${collectionRow.slug}`);

    return {
      success: true,
      document: newDocument,
      collectionSlug: collectionRow.slug,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    console.error("NewDocumentAction error:", error);
    return { error: "Failed to create document" };
  }
}
