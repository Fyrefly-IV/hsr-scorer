import { z } from "zod";
import { GameSchema } from "@/shared/model/schemas";

export const CharacterAssetsSchema = z.object({
  portrait: z.string().optional().nullable(),
});

export const CharacterSchema = z.object({
  id: z.string(),
  game: GameSchema,
  name: z.string(),
  association: z.string().nullish(),
  assets: CharacterAssetsSchema,
});

