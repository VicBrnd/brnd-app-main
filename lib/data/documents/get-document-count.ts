import { count, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { document } from "@/lib/db/schema";
import { takeFirstOrThrow } from "@/lib/db/utils";

import "server-only";

export async function getDocumentCount(collectionId: string) {
  const { value } = await db
    .select({ value: count() })
    .from(document)
    .where(eq(document.collectionId, collectionId))
    .then(takeFirstOrThrow);

  return value;
}
