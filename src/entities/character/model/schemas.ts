import { z } from "zod";
import { GameSchema } from "@/shared/model/schemas";
import {
  PATH_ABUNDANCE,
  PATH_DESTRUCTION,
  PATH_ERUDITION,
  PATH_HARMONY,
  PATH_HUNT,
  PATH_NIHILITY,
  PATH_PRESERVATION,
} from "../config/constants";

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

export const StarRailPathsSchema = z.union([
  z.literal(PATH_ABUNDANCE),
  z.literal(PATH_DESTRUCTION),
  z.literal(PATH_ERUDITION),
  z.literal(PATH_HARMONY),
  z.literal(PATH_HUNT),
  z.literal(PATH_NIHILITY),
  z.literal(PATH_PRESERVATION),
]);

export const StarRailTypesSchema = z.union([
  z.literal("Physical"),
  z.literal("Fire"),
  z.literal("Ice"),
  z.literal("Lightning"),
  z.literal("Wind"),
  z.literal("Quantum"),
  z.literal("Imaginary"),
]);

export const StarRailCharacterSchema = CharacterSchema.extend({
  path: StarRailPathsSchema,
  type: StarRailTypesSchema,
});
