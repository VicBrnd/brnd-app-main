import { count, eq } from "drizzle-orm";
import { Elysia } from "elysia";

import { BetterAuth } from "@/app/api/auth";
import { db } from "@/lib/db";
import { collection, document } from "@/lib/db/schema";

export const Collections = new Elysia({
  name: "collections",
  prefix: "/collections",
  tags: ["Collections"],
})
  .use(BetterAuth)
  .get("/", "Collections")
  .get(
    "/get-collections",
    async ({ user }) => {
      const collectionData = await db
        .select({
          id: collection.id,
          userId: collection.userId,
          title: collection.title,
          slug: collection.slug,
          color: collection.color,
          createdAt: collection.createdAt,
          updatedAt: collection.updatedAt,
          filesCount: count(document.id),
        })
        .from(collection)
        .leftJoin(document, eq(document.collectionId, collection.id))
        .where(eq(collection.userId, user.id))
        .groupBy(collection.id);

      return collectionData;
    },
    {
      auth: true,
    },
  );
