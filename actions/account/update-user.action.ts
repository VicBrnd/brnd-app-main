"use server";

import { updateTag } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { authActionClient } from "@/lib/safe-action";
import { updateUserSchema } from "@/schemas/account/update-user.schema";

export const updateUser = authActionClient
  .metadata({ actionName: "updateUser" })
  .inputSchema(updateUserSchema)
  .action(async ({ parsedInput, ctx: { sessionData } }) => {
    await auth.api.updateUser({
      body: {
        name: parsedInput?.name,
        image: parsedInput?.image,
      },
      headers: await headers(),
    });

    updateTag(`${sessionData.user}`);
  });
