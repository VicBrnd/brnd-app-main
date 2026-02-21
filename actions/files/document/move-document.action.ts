"use server";

import { updateTag } from "next/cache";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";
import { takeFirstOrThrow } from "@/lib/db/utils";
import { authActionClient } from "@/lib/safe-action";
import { MoveDocumentSchema } from "@/schemas/files/document/move-document.schema";

export const moveDocumentAction = authActionClient
  .metadata({ actionName: "moveDocument" })
  .inputSchema(MoveDocumentSchema)
  .action(async ({ parsedInput: { documentId, collectionId } }) => {
    const [targetCollection] = await Promise.all([
      db
        .select({ title: collection.title })
        .from(collection)
        .where(eq(collection.id, collectionId))
        .then(takeFirstOrThrow),
      db
        .update(document)
        .set({ collectionId, updatedAt: new Date() })
        .where(eq(document.id, documentId)),
    ]);

    updateTag("files");

    return { success: true, collectionTitle: targetCollection.title };
  });
