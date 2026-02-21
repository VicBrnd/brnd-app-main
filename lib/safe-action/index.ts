import { unauthorized } from "next/navigation";

import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { z } from "zod/v4";

import { getSession } from "@/lib/data/account/get-session";

export class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }
    console.error(e);
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const sessionData = await getSession();

  if (!sessionData) {
    return unauthorized();
  }

  return next({ ctx: { sessionData } });
});
