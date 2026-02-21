"use server";

import { updateTag } from "next/cache";

import { z } from "zod/v4";

import { updateUser } from "@/actions/account/update-user.action";
import { db } from "@/lib/db";
import { image } from "@/lib/db/schema";
import { authActionClient } from "@/lib/safe-action";
import { utapi } from "@/lib/upload";

export const addAvatar = authActionClient
  .metadata({ actionName: "addAvatar" })
  .inputSchema(z.array(z.instanceof(File)))
  .action(async ({ parsedInput, ctx: { sessionData } }) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    for (const file of parsedInput) {
      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          "Invalid file type. Only JPEG, PNG, and WebP are allowed.",
        );
      }
    }

    const [result] = await utapi.uploadFiles(parsedInput);

    if (result.error) {
      throw new Error(
        process.env.NODE_ENV === "development"
          ? result.error.message
          : "Server upload failed. Contact support",
      );
    }

    try {
      const uploadedFile = result.data;

      await db.insert(image).values({
        name: uploadedFile.name,
        url: uploadedFile.ufsUrl,
        size: uploadedFile.size,
        key: uploadedFile.key,
        userId: sessionData.user.id,
        type: uploadedFile.type,
        customId: uploadedFile.customId,
        fileHash: uploadedFile.fileHash,
      });

      await updateUser({ image: uploadedFile.ufsUrl });

      updateTag("session");
      return { success: true };
    } catch (error) {
      try {
        await utapi.deleteFiles([result.data.key]);
      } catch (deleteError) {
        console.error("Failed to cleanup uploaded file:", deleteError);
      }
      throw error;
    }
  });
