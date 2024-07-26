import { z } from "zod";

export const GAME_STAR_RAIL = "hsr" as const;
export const GAME_GENSHIN = "gi" as const;
export const GAME_ZENLESS = "zzz" as const;

export const GameSchema = z.union([
  z.literal(GAME_STAR_RAIL),
  z.literal(GAME_GENSHIN),
  z.literal(GAME_ZENLESS),
]);

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

export type Character = z.infer<typeof CharacterSchema>;
