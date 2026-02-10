import { t } from "elysia";

export const CollectionModel = {
  create: t.Object({
    title: t.String({ minLength: 1, maxLength: 32 }),
    slug: t.String({
      minLength: 1,
      maxLength: 255,
      pattern: "^[a-z0-9-]+$",
    }),
  }),

  edit: t.Object({
    id: t.String({ minLength: 1 }),
    title: t.String({ minLength: 1, maxLength: 32 }),
    slug: t.String({
      minLength: 1,
      maxLength: 255,
      pattern: "^[a-z0-9-]+$",
    }),
    color: t.String(),
  }),

  delete: t.Object({
    ids: t.Array(t.String()),
  }),
};
