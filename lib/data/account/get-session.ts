import { cache } from "react";

import { cacheTag } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import "server-only";

export const getSession = cache(async () => {
  "use cache: private";
  cacheTag(`session`);

  const headersList = await headers();
  return auth.api.getSession({ headers: headersList });
});

// export async function getSession() {
//     "use cache: private";
//     cacheTag(`session`);
//     const headersList = await headers();
//     return auth.api.getSession({ headers: headersList });
// }
