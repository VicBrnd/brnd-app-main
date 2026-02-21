"use server";

import { updateTag } from "next/cache";

import { and, eq } from "drizzle-orm";
import { returnValidationErrors } from "next-safe-action";

import { db } from "@/lib/db";
import { collection } from "@/lib/db/schema";
import { takeFirstOrNull, takeFirstOrThrow } from "@/lib/db/utils";
import { authActionClient } from "@/lib/safe-action";
import { CreateCollectionFormSchema } from "@/schemas/files/collection/create-collection.schema";

export const createCollection = authActionClient
  .metadata({ actionName: "createCollection" })
  .inputSchema(CreateCollectionFormSchema)
  .action(async ({ parsedInput, ctx: { sessionData } }) => {
    const duplicateCollectionSlug = await db
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

    if (duplicateCollectionSlug) {
      returnValidationErrors(CreateCollectionFormSchema, {
        slug: {
          _errors: ["A collection with this slug already exists"],
        },
      });
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
