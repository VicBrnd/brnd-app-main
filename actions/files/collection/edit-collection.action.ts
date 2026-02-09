"use server";

import { updateTag } from "next/cache";

import { and, eq, ne } from "drizzle-orm";

import { db } from "@/lib/db";
import { collection } from "@/lib/db/schema";
import { takeFirstOrNull } from "@/lib/db/utils";
import { authActionClient } from "@/lib/safe-action";
import { EditCollectionFormSchema } from "@/schemas/files/edit-collection.schema";

export const editCollection = authActionClient
  .metadata({ actionName: "editCollection" })
  .inputSchema(EditCollectionFormSchema)
  .action(async ({ parsedInput, ctx: { sessionData } }) => {
    const duplicateCollection = await db
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

    if (duplicateCollection) {
      return { error: "A collection with this slug already exists." };
    }

    await db
      .update(collection)
      .set({
        title: parsedInput.title,
        slug: parsedInput.slug,
        color: parsedInput.color,
      })
      .where(
        and(
          eq(collection.id, parsedInput.id),
          eq(collection.userId, sessionData.user.id),
        ),
      );

    updateTag("files");

    return { success: true };
  });
