import type { z } from "zod";
import type { CharacterSchema } from "./schemas";

export type Character = z.infer<typeof CharacterSchema>;
