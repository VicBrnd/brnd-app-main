import { defineConfig } from "drizzle-kit";

import "dotenv/config";

export default defineConfig({
  out: "./lib/db/drizzle",
  schema: "./lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
