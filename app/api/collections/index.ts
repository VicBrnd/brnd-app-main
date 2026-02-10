import { Elysia } from "elysia";

import { BetterAuth } from "@/app/api/auth";
import { CollectionModel } from "@/app/api/collections/model";
import { CollectionService } from "@/app/api/collections/service";

export const Collections = new Elysia({
  name: "collections",
  prefix: "/collections",
  tags: ["Collections"],
})
  .use(BetterAuth)
  .get(
    "/",
    ({ user }) => CollectionService.getAll(user.id),
    { auth: true },
  )
  .post(
    "/",
    ({ user, body }) => CollectionService.create(user.id, body),
    { auth: true, body: CollectionModel.create },
  )
  .put(
    "/",
    ({ user, body }) => CollectionService.edit(user.id, body),
    { auth: true, body: CollectionModel.edit },
  )
  .delete(
    "/",
    ({ user, body }) => CollectionService.delete(user.id, body.ids),
    { auth: true, body: CollectionModel.delete },
  );
