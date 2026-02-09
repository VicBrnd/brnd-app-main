"use server";

import { updateTag } from "next/cache";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { collection } from "@/lib/db/schema";
import { takeFirstOrNull, takeFirstOrThrow } from "@/lib/db/utils";
import { authActionClient } from "@/lib/safe-action";
import { CreateCollectionFormSchema } from "@/schemas/files/create-collection.schema";

export const createCollection = authActionClient
  .metadata({ actionName: "createCollection" })
  .inputSchema(CreateCollectionFormSchema)
  .action(async ({ parsedInput, ctx: { sessionData } }) => {
    const duplicateCollection = await db
      .select({ id: collection.id })
      .from(collection)
      .where(
        and(
          eq(collection.slug, parsedInput.slug),
          eq(collection.userId, sessionData.user.id),
        ),
      )
      .limit(1)
      .then(takeFirstOrNull);

    if (duplicateCollection) {
      return { error: "A collection with this slug already exists." };
    }

    const newCollection = await db
      .insert(collection)
      .values({
        title: parsedInput.title,
        slug: parsedInput.slug,
        userId: sessionData.user.id,
      })
      .returning()
      .then(takeFirstOrThrow);

    updateTag("files");

    return { success: true, collection: newCollection };
  });
