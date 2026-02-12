import * as z from "zod";

export const EditCollectionFormSchema = z.object({
  id: z.string().min(1),
  title: z
    .string()
    .min(1, "Title must be at least 1 characters.")
    .max(32, "Title must be at most 32 characters.")
    .optional(),
  slug: z
    .string()
    .min(1, "Slug must be at least 1 characters.")
    .max(255, "Slug must be at most 255 characters.")
    .regex(
      /^[\da-z-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens",
    )
    .optional(),

  color: z.string().optional(),
});
