import { z } from "zod";
import { CharacterSchema } from "@/entities/character/model/schemas";

export const QueueIDsEntrySchema = z.tuple([CharacterSchema.shape.id, CharacterSchema.shape.id]);

export const ChoiceEntrySchema = z.object({
  pair: QueueIDsEntrySchema,
  winnerId: CharacterSchema.shape.id.nullable(),
});

export const ScreenStateSchema = z.union([
  z.literal("start"),
  z.literal("progress"),
  z.literal("results"),
]);
