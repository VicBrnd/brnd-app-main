import {
  collection,
} from "@/lib/db/schema";

export type Collection = typeof collection.$inferSelect;
