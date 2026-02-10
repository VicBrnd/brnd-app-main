"use server";

import { updateTag } from "next/cache";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { document } from "@/lib/db/schema";
import { authActionClient } from "@/lib/safe-action";
import { MoveDocumentSchema } from "@/schemas/files/document/move-document.schema";

export const moveDocumentAction = authActionClient
  .metadata({ actionName: "moveDocument" })
  .inputSchema(MoveDocumentSchema)
  .action(async ({ parsedInput: { documentId, collectionId } }) => {
    await db
      .update(document)
      .set({ collectionId, updatedAt: new Date() })
      .where(eq(document.id, documentId));

    updateTag("files");

    return { success: true };
  });
