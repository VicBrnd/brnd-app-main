import { z } from "zod/v4";

export const updateUserSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Name is required."
          : "Name must be a string.",
    })
    .trim()
    .min(3, "Minimum 3 characters allowed.")
    .max(32, "Maximum 32 characters allowed.")
    .refine(
      (value) => /^[A-Za-zÀ-ÿ]/.test(value),
      "Name must start with a letter."
    )
    .refine(
      (value) => /^[\s'A-Za-zÀ-ÿ\-]+$/.test(value),
      "Name can only contain letters, spaces, hyphens and apostrophes."
    )
    .refine(
      (value) => !/\s{2,}/.test(value),
      "Name cannot contain consecutive spaces"
    )
    .transform((value) =>
      value
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    )
    .optional(),
  image: z.string().optional(),
  currentPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    })
    .optional(),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    })
    .optional(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
