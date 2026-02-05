import { unauthorized } from "next/navigation";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod/v4";

import { getSession } from "@/lib/data/account/get-session";

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const sessionData = await getSession();

  if (!sessionData) {
    return unauthorized();
  }

  return next({ ctx: { sessionData } });
});
