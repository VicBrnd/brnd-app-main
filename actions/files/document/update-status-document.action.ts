"use server";

import { updateTag } from "next/cache";

import { and, eq, inArray, not } from "drizzle-orm";
import { z } from "zod/v4";

import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";
import { takeFirstOrNull } from "@/lib/db/utils";
import { ActionError, authActionClient } from "@/lib/safe-action";

export const updateStatusDocument = authActionClient
  .metadata({ actionName: "updateStatusDocument" })
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx: { sessionData } }) => {
    const userCollections = db
      .select({ id: collection.id })
      .from(collection)
      .where(eq(collection.userId, sessionData.user.id));

    const toggledStatus = await db
      .update(document)
      .set({ isPublished: not(document.isPublished) })
      .where(
        and(
          eq(document.id, parsedInput.id),
          inArray(document.collectionId, userCollections),
        ),
      )
      .returning({ isPublished: document.isPublished })
      .then(takeFirstOrNull);

    if (!toggledStatus) {
      throw new ActionError("Unable to update document status");
    }

    updateTag("files");

    return { success: true, isPublished: toggledStatus.isPublished };
  });
