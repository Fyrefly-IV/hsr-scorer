import type { z } from "zod";
import type { CharacterSchema, StarRailCharacterSchema } from "./schemas";

export type Character = z.infer<typeof CharacterSchema>;
export type StarRailCharacter = z.infer<typeof StarRailCharacterSchema>;
