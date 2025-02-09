import { z } from "zod";
import { CharacterSchema } from "@/entities/character/model/schemas";
import { EDITING_QUEUE, FINISHED, IN_PROGRESS, START_SCREEN } from "../config";

export const CharacterPairSchema = z.object({
	firstId: CharacterSchema.shape.id,
	secondId: CharacterSchema.shape.id,
});

export type QueueEntry = z.infer<typeof CharacterPairSchema>;

export const HistoryEntrySchema = z.object({
	pair: CharacterPairSchema,
	selectedId: CharacterSchema.shape.id.nullable(),
});

export type HistoryEntry = z.infer<typeof HistoryEntrySchema>;

export const ScoresSchema = z.record(CharacterSchema.shape.id, z.number().optional());

export type Scores = z.infer<typeof ScoresSchema>;

export const StageSchema = z.union([
	z.literal(START_SCREEN),
	z.literal(EDITING_QUEUE),
	z.literal(IN_PROGRESS),
	z.literal(FINISHED),
]);

export type Stage = z.infer<typeof StageSchema>;
