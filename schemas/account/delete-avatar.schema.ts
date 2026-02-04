import { z } from "zod/v4";

export const deleteAvatarSchema = z.object({
  keys: z.array(z.string()),
});
