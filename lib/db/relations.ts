import { relations } from "drizzle-orm";

import {
  account,
  collection,
  document,
  image,
  passkey,
  session,
  user,
} from "@/lib/db/schema";

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  passkeys: many(passkey),
  images: many(image),
  collections: many(collection),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const passkeyRelations = relations(passkey, ({ one }) => ({
  user: one(user, {
    fields: [passkey.userId],
    references: [user.id],
  }),
}));

export const imageRelations = relations(image, ({ one }) => ({
  user: one(user, {
    fields: [image.userId],
    references: [user.id],
  }),
}));

export const collectionRelations = relations(collection, ({ one, many }) => ({
  user: one(user, {
    fields: [collection.userId],
    references: [user.id],
  }),
  documents: many(document),
}));

export const documentRelations = relations(document, ({ one }) => ({
  collection: one(collection, {
    fields: [document.collectionId],
    references: [collection.id],
  }),
}));
