import { Elysia } from "elysia";

import { BetterAuth } from "@/app/api/auth";
import { DocumentModel } from "@/app/api/documents/model";
import { DocumentService } from "@/app/api/documents/service";

export const Documents = new Elysia({
  name: "documents",
  prefix: "/documents",
  tags: ["Documents"],
})
  .use(BetterAuth)
  .get(
    "/",
    ({ user, query }) => DocumentService.getAll(user.id, query.collectionId),
    { auth: true, query: DocumentModel.query },
  );
