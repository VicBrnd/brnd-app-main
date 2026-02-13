import { cacheLife, cacheTag } from "next/cache";

import { desc, eq } from "drizzle-orm";

import { getAuthContext } from "@/lib/auth/auth-context";
import { db } from "@/lib/db";
import { image } from "@/lib/db/schema";

import "server-only";

export type AvatarsProps = Pick<
  typeof image.$inferSelect,
  "id" | "url" | "name" | "key"
>;

export async function getImages(): Promise<AvatarsProps[]> {
  "use cache: private";
  cacheTag("session");
  cacheLife({ expire: 3600 });

  const ctx = await getAuthContext();

  const imagesData = await db
    .select({
      id: image.id,
      url: image.url,
      name: image.name,
      key: image.key,
    })
    .from(image)
    .where(eq(image.userId, ctx.user.id))
    .orderBy(desc(image.uploadedAt));

  return imagesData;
}
