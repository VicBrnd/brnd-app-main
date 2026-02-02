"use server";

import { updateTag } from "next/cache";
import { unauthorized } from "next/navigation";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { getSession } from "@/lib/data/get-session";
import { db } from "@/lib/db";
import { collection } from "@/lib/db/schema";
import { NewCollectionFormSchema } from "@/schemas/new-collection.schema";

export async function NewCollectionAction(formData: FormData) {
  const session = await getSession();

  if (!session) {
    return unauthorized();
  }
  try {
    const validatedData = NewCollectionFormSchema.parse({
      title: formData.get("title"),
      slug: formData.get("slug"),
    });

    const [existing] = await db
      .select({ id: collection.id })
      .from(collection)
      .where(eq(collection.slug, validatedData.slug))
      .limit(1);

    if (existing) {
      return { error: "A collection with this slug already exists" };
    }

    const [newCollection] = await db
      .insert(collection)
      .values({
        title: validatedData.title,
        slug: validatedData.slug,
        userId: session.user.id,
      })
      .returning();

    updateTag("collections");

    return { success: true, collection: newCollection };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    console.error("NewCollectionAction error:", error);
    return { error: "Failed to create collection" };
  }
}
