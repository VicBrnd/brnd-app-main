import { cacheTag } from "next/cache";

import { desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { image } from "@/lib/db/schema";

import "server-only";

export type ImagesProps = Pick<
  typeof image.$inferSelect,
  "id" | "url" | "name" | "key"
>;

export async function getImages(userId: string): Promise<ImagesProps[]> {
  "use cache";
  cacheTag("session");

  const imagesData = await db
    .select({
      id: image.id,
      url: image.url,
      name: image.name,
      key: image.key,
    })
    .from(image)
    .where(eq(image.userId, userId))
    .orderBy(desc(image.uploadedAt));

  return imagesData;
}
