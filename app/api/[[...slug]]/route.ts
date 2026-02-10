import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";

import { BetterAuth } from "@/app/api/auth";
import { Collections } from "@/app/api/collections";
import { OpenAPI } from "@/lib/auth/auth-openapi";

export const app = new Elysia({ name: "app", prefix: "/api" })
  .use(
    openapi({
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),
      },
    }),
  )
  .use(BetterAuth)
  .use(Collections);

export const GET = app.fetch;
export const POST = app.fetch;
