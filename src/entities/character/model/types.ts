import type { z } from "zod";
import type {
  CharacterSchema,
  StarRailCharacterSchema,
  StarRailPathsSchema,
  StarRailTypesSchema,
} from "./schemas";

export type Character = z.infer<typeof CharacterSchema>;

export type StarRailPaths = z.infer<typeof StarRailPathsSchema>;
export type StarRailTypes = z.infer<typeof StarRailTypesSchema>;
export type StarRailCharacter = z.infer<typeof StarRailCharacterSchema>;
