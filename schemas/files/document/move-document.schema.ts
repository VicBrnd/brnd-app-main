import { z } from "zod";

export const MoveDocumentSchema = z.object({
  documentId: z.string().uuid(),
  collectionId: z.string().uuid(),
});

export type MoveDocumentInput = z.infer<typeof MoveDocumentSchema>;
