"use server";

import { updateTag } from "next/cache";

import { and, eq, inArray } from "drizzle-orm";

import { updateUser } from "@/actions/account/update-user.action";
import { db } from "@/lib/db";
import { image } from "@/lib/db/schema";
import { authActionClient } from "@/lib/safe-action";
import { utapi } from "@/lib/upload";
import { deleteAvatarSchema } from "@/schemas/account/delete-avatar.schema";

export const deleteAvatar = authActionClient
  .metadata({ actionName: "deleteAvatar" })
  .inputSchema(deleteAvatarSchema)
  .action(async ({ parsedInput, ctx: { sessionData } }) => {
    const imagesToDelete = await db
      .select({ key: image.key, url: image.url })
      .from(image)
      .where(
        and(
          inArray(image.key, parsedInput.keys),
          eq(image.userId, sessionData.user.id),
        ),
      );

    if (imagesToDelete.length !== parsedInput.keys.length) {
      throw new Error("Some images not found or access denied");
    }

    const shouldUpdateUserImage =
      sessionData.user.image &&
      imagesToDelete.some((img) => sessionData.user.image === img.url);

    await db
      .delete(image)
      .where(
        and(
          inArray(image.key, parsedInput.keys),
          eq(image.userId, sessionData.user.id),
        ),
      );

    if (shouldUpdateUserImage) {
      await updateUser({ image: "" });
    }

    const deleteResults = await Promise.allSettled(
      parsedInput.keys.map((key) => utapi.deleteFiles(key)),
    );

    const failedDeletions = deleteResults.filter(
      (result) => result.status === "rejected" || !result.value.success,
    );

    if (failedDeletions.length > 0) {
      console.error(
        "Some files failed to delete from storage:",
        failedDeletions,
      );
    }

    updateTag("session");
  });
