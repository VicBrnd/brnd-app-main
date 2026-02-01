import {
  account,
  collection,
  document,
  image,
  passkey,
  session,
  user,
} from "@/lib/db/schema";

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Session = typeof session.$inferSelect;
export type Account = typeof account.$inferSelect;
export type Passkey = typeof passkey.$inferSelect;
export type Image = typeof image.$inferSelect;
export type NewImage = typeof image.$inferInsert;
export type Collection = typeof collection.$inferSelect;
export type NewCollection = typeof collection.$inferInsert;
export type Document = typeof document.$inferSelect;
export type NewDocument = typeof document.$inferInsert;
