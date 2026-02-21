import { t } from "elysia";

export const DocumentModel = {
  query: t.Object({
    collectionId: t.Optional(t.String()),
  }),
};
