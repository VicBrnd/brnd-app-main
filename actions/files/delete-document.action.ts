"use server";

import { updateTag } from "next/cache";

import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod/v4";

import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";
import { authActionClient } from "@/lib/safe-action";

export const deleteDocument = authActionClient
  .metadata({ actionName: "deleteDocument" })
  .inputSchema(
    z.object({
      ids: z.array(z.string()),
    }),
  )
  .action(async ({ parsedInput, ctx: { sessionData } }) => {
    const userCollections = db
      .select({ id: collection.id })
      .from(collection)
      .where(eq(collection.userId, sessionData.user.id));

    await db
      .delete(document)
      .where(
        and(
          inArray(document.id, parsedInput.ids),
          inArray(document.collectionId, userCollections),
        ),
      );

    updateTag("documents");
    updateTag("collections");

    return { success: true };
  });
