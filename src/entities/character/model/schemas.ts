import { z } from "zod";
import { GameSchema } from "@/shared/model/schemas";

export const CharacterAssetsSchema = z.object({
  portrait: z.string().optional().nullable(),
});

export const CharacterSchema = z.object({
  id: z.string(),
  game: GameSchema,
  name: z.string(),
  assets: CharacterAssetsSchema,
  rarity: z.union([z.literal(5), z.literal(4)]),
  association: z.string().nullish(),
});

export const StarRailCharacterSchema = CharacterSchema.extend({
  path: z.union([
    z.literal("Abundance"),
    z.literal("Destruction"),
    z.literal("Erudition"),
    z.literal("Harmony"),
    z.literal("Hunt"),
    z.literal("Nihility"),
    z.literal("Preservation"),
  ]),
  type: z.union([
    z.literal("Physical"),
    z.literal("Fire"),
    z.literal("Ice"),
    z.literal("Lightning"),
    z.literal("Wind"),
    z.literal("Quantum"),
    z.literal("Imaginary"),
  ]),
});
