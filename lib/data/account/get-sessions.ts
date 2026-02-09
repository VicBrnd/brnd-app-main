import { cacheLife, cacheTag } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import "server-only";

export async function getSessions() {
  "use cache: private";
  cacheTag("sessions");
  cacheLife({ expire: 3600 });

  const cookieHeader = (await headers()).get("cookie") ?? "";
  return auth.api.listSessions({
    headers: new Headers({ cookie: cookieHeader }),
  });
}
