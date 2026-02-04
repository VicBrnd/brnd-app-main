import { unstable_cache as cache } from "next/cache";
import { unauthorized } from "next/navigation";

import { eq } from "drizzle-orm";

import { getSession } from "@/lib/data/get-session";
import { db } from "@/lib/db";
import { image } from "@/lib/db/schema";

export type UserImagesProps = Pick<
  typeof image.$inferSelect,
  "id" | "url" | "name" | "key"
>;

export async function getUserImages(): Promise<UserImagesProps[]> {
  const sessionData = await getSession();

  if (!sessionData) {
    return unauthorized();
  }

  return cache(async () => {
    const userImages = await db.query.image.findMany({
      where: eq(image.userId, sessionData.user.id),
      columns: {
        id: true,
        url: true,
        name: true,
        key: true,
      },
      orderBy: (image, { desc }) => [desc(image.uploadedAt)],
    });

    return userImages;
  })();
}
