import { unstable_cache as cache } from "next/cache";
import { unauthorized } from "next/navigation";

import { eq } from "drizzle-orm";

import { getSession } from "@/lib/data/get-session";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";

export type UserProps = Pick<
  typeof user.$inferSelect,
  "id" | "email" | "name" | "image" | "role"
>;

export async function getUser(): Promise<UserProps> {
  const sessionData = await getSession();

  if (!sessionData) {
    return unauthorized();
  }

  return cache(async () => {
    const userData = await db.query.user.findFirst({
      where: eq(user.id, sessionData.user.id),
      columns: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
      },
    });

    if (!userData) {
      throw new Error(`User with id ${sessionData.user.id} not found`);
    }

    return userData;
  })();
}
