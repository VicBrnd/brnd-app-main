"use server";

import { updateTag } from "next/cache";

import { and, inArray, eq } from "drizzle-orm";
import { z } from "zod/v4";

import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";
import { authActionClient } from "@/lib/safe-action";

export const deleteCollection = authActionClient
  .metadata({ actionName: "deleteCollection" })
  .inputSchema(
    z.object({
      ids: z.array(z.string()),
    }),
  )
  .action(async ({ parsedInput, ctx: { sessionData } }) => {
    const hasDocuments = await db
      .select({ id: document.id })
      .from(document)
      .where(inArray(document.collectionId, parsedInput.ids))
      .limit(1);

    if (hasDocuments.length > 0) {
      return {
        error: "Delete documents before deleting the collection.",
      };
    }

    await db
      .delete(collection)
      .where(
        and(
          inArray(collection.id, parsedInput.ids),
          eq(collection.userId, sessionData.user.id),
        ),
      );

    updateTag("collections");
    updateTag("documents");

    return { success: true };
  });
