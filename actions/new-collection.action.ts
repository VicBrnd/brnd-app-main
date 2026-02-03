"use server";

import { updateTag } from "next/cache";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { collection } from "@/lib/db/schema";
import { authActionClient } from "@/lib/safe-action";
import { NewCollectionFormSchema } from "@/schemas/new-collection.schema";

export const NewCollectionAction = authActionClient
  .metadata({ actionName: "NewCollection" })
  .inputSchema(NewCollectionFormSchema)
  .action(async ({ parsedInput, ctx: { sessionData } }) => {
    const [checkCollection] = await db
      .select({ id: collection.id })
      .from(collection)
      .where(
        and(
          eq(collection.slug, parsedInput.slug),
          eq(collection.userId, sessionData.user.id),
        ),
      )
      .limit(1);

    if (checkCollection) {
      return { error: "A collection with this slug already exists" };
    }

    const [newCollection] = await db
      .insert(collection)
      .values({
        title: parsedInput.title,
        slug: parsedInput.slug,
        userId: sessionData.user.id,
      })
      .returning();

    updateTag("collections");

    return { success: true, collection: newCollection };
  });
