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
  TYPE_FIRE,
  TYPE_ICE,
  TYPE_IMAGINARY,
  TYPE_LIGHTNING,
  TYPE_PHYSICAL,
  TYPE_QUANTUM,
  TYPE_WIND,
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
  z.literal(TYPE_PHYSICAL),
  z.literal(TYPE_FIRE),
  z.literal(TYPE_ICE),
  z.literal(TYPE_LIGHTNING),
  z.literal(TYPE_WIND),
  z.literal(TYPE_QUANTUM),
  z.literal(TYPE_IMAGINARY),
]);

export const StarRailCharacterSchema = CharacterSchema.extend({
  path: StarRailPathsSchema,
  type: StarRailTypesSchema,
});
