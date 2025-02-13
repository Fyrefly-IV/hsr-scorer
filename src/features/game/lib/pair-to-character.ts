import { CHARACTERS_MAP } from "@/entities/character/data/characters";
import type { QueueEntry } from "../model/schemas";

export function pairToCharactersRequired(pair: QueueEntry) {
	const a = CHARACTERS_MAP.get(pair.firstId);
	const b = CHARACTERS_MAP.get(pair.secondId);

	if (!a || !b) {
		throw TypeError("one of the character IDs in pair is invalid");
	}

	return [a, b] as const;
}
