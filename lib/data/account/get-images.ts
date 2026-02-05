import { cacheTag } from "next/cache";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { image } from "@/lib/db/schema";

import "server-only";

export type UserImagesProps = Pick<
  typeof image.$inferSelect,
  "id" | "url" | "name" | "key"
>;

export async function getImages(userId: string): Promise<UserImagesProps[]> {
  "use cache: private";
  cacheTag("user");

  return db.query.image.findMany({
    where: eq(image.userId, userId),
    columns: {
      id: true,
      url: true,
      name: true,
      key: true,
    },
    orderBy: (image, { desc }) => [desc(image.uploadedAt)],
  });
}
