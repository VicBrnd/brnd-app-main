import { cacheTag } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import "server-only";

export async function getSession() {
  "use cache: private";
  cacheTag(`session`);
  const headersList = await headers();
  return auth.api.getSession({ headers: headersList });
}
