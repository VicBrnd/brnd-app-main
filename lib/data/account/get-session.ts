import { cacheLife, cacheTag } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import "server-only";

export async function getSession() {
  "use cache: private";
  cacheTag("session");
  cacheLife({ expire: 3600 });

  const cookieHeader = (await headers()).get("cookie") ?? "";
  return auth.api.getSession({
    headers: new Headers({ cookie: cookieHeader }),
  });
}
