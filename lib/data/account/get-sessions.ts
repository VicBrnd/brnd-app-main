import { cache } from "react";

import { cacheTag } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import "server-only";

export const getSessions = cache(async () => {
  "use cache: private";
  cacheTag(`sessions`);

  const headersList = await headers();
  return auth.api.listSessions({ headers: headersList });
});
