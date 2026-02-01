import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as relations from "@/lib/db/relations";
import * as schema from "@/lib/db/schema";

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, {
  schema: {
    ...schema,
    ...relations,
  },
});

export type Database = typeof db;

export { relations, schema };
