"use server";

import { updateTag } from "next/cache";

import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod/v4";

import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";
import { takeFirstOrNull } from "@/lib/db/utils";
import { ActionError, authActionClient } from "@/lib/safe-action";

export const deleteCollection = authActionClient
  .metadata({ actionName: "deleteCollection" })
  .inputSchema(
    z.object({
      ids: z.array(z.string()),
    }),
  )
  .action(async ({ parsedInput, ctx: { sessionData } }) => {
    const emptyCollection = await db
      .select({ id: document.id })
      .from(document)
      .innerJoin(collection, eq(document.collectionId, collection.id))
      .where(
        and(
          inArray(document.collectionId, parsedInput.ids),
          eq(collection.userId, sessionData.user.id),
        ),
      )
      .limit(1)
      .then(takeFirstOrNull);

    if (emptyCollection) {
      throw new ActionError("Collection is not empty");
    }

    await db
      .delete(collection)
      .where(
        and(
          inArray(collection.id, parsedInput.ids),
          eq(collection.userId, sessionData.user.id),
        ),
      );

    updateTag("files");

    return { success: true };
  });
