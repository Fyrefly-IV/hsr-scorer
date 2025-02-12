import type { StarRailCharacter } from "@/entities/character/model/types";

export type Filter = {
	id: string;
	field: keyof StarRailCharacter;
	value: string;
};
