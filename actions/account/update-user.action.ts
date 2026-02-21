"use server";

import { updateTag } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { authActionClient } from "@/lib/safe-action";
import { UpdateUserFormSchema } from "@/schemas/account/update-user.schema";

export const updateUser = authActionClient
  .metadata({ actionName: "updateUser" })
  .inputSchema(UpdateUserFormSchema)
  .action(async ({ parsedInput }) => {
    await auth.api.updateUser({
      body: {
        name: parsedInput?.name,
        image: parsedInput?.image,
      },
      headers: await headers(),
    });

    updateTag("session");

    return { success: true };
  });
