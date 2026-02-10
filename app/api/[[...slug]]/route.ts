import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";

import { BetterAuth } from "@/app/api/auth";
import { Collections } from "@/app/api/collections";
import { OpenAPI } from "@/lib/auth/auth-openapi";

export const app = new Elysia({ name: "app", prefix: "/api" })
  .use(
    process.env.NODE_ENV === "development"
      ? openapi({
          documentation: {
            info: {
              title: "Brnd Documentation",
              version: "1.0.0",
            },
            components: await OpenAPI.components,
            paths: await OpenAPI.getPaths(),
          },
        })
      : (app) => app,
  )
  .use(BetterAuth)
  .use(Collections);

export const GET = app.fetch;
export const POST = app.fetch;
