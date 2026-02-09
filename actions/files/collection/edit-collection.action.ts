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
    const { id, title, slug, color } = parsedInput;

    const existingCollection = await db
      .select({ id: collection.id })
      .from(collection)
      .where(
        and(
          eq(collection.slug, slug),
          ne(collection.id, id),
          eq(collection.userId, sessionData.user.id),
        ),
      )
      .limit(1)
      .then(takeFirstOrNull);

    if (existingCollection) {
      return { error: "A collection with this slug already exists" };
    }

    await db
      .update(collection)
      .set({ title, slug, color })
      .where(
        and(eq(collection.id, id), eq(collection.userId, sessionData.user.id)),
      );

    updateTag("files");

    return { success: true };
  });
