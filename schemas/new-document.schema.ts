import * as z from "zod";

export const NewDocumentFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title must be at least 1 characters.")
    .max(32, "Title must be at most 32 characters."),
  slug: z
    .string()
    .min(1, "Slug must be at least 1 characters.")
    .max(255, "Slug must be at most 255 characters.")
    .regex(
      /^[\da-z-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens",
    ),
  collection: z.string().min(1, "Collection is required"),
});
