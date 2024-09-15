import type { z } from "zod";
import type { Character } from "@/entities/character/model/types";
import type { ChoiceEntrySchema, QueueIDsEntrySchema, ScreenStateSchema } from "./schemas";

export type QueueIDsEntry = z.infer<typeof QueueIDsEntrySchema>;
export type ChoiceEntry = z.infer<typeof ChoiceEntrySchema>;
export type ScreenState = z.infer<typeof ScreenStateSchema>;
export type Scores = { [Key in Character["id"]]: number };
