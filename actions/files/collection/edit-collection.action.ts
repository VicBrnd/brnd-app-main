"use server";

import { updateTag } from "next/cache";

import { and, eq, ne } from "drizzle-orm";

import { db } from "@/lib/db";
import { collection } from "@/lib/db/schema";
import { takeFirstOrNull } from "@/lib/db/utils";
import { authActionClient } from "@/lib/safe-action";
import { EditCollectionFormSchema } from "@/schemas/files/collection/edit-collection.schema";

export const editCollection = authActionClient
  .metadata({ actionName: "editCollection" })
  .inputSchema(EditCollectionFormSchema)
  .action(async ({ parsedInput, ctx: { sessionData } }) => {
    if (parsedInput.slug) {
      const duplicateCollectionSlug = await db
        .select({ id: collection.id })
        .from(collection)
        .where(
          and(
            eq(collection.slug, parsedInput.slug),
            ne(collection.id, parsedInput.id),
            eq(collection.userId, sessionData.user.id),
          ),
        )
        .limit(1)
        .then(takeFirstOrNull);

      if (duplicateCollectionSlug) {
        return { error: "A collection with this slug already exists." };
      }
    }

    const updateData: Record<string, string> = {};
    if (parsedInput.title) updateData.title = parsedInput.title;
    if (parsedInput.slug) updateData.slug = parsedInput.slug;
    if (parsedInput.color) updateData.color = parsedInput.color;

    await db
      .update(collection)
      .set(updateData)
      .where(
        and(
          eq(collection.id, parsedInput.id),
          eq(collection.userId, sessionData.user.id),
        ),
      );

    updateTag("files");

    return { success: true };
  });
