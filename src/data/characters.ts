import { STAR_RAIL_CHARACTERS } from "./star-rail";
import type { Character } from "@/data/schemas";

export const CHARACTERS_MAP: Map<Character["id"], Character> = new Map(
  [...STAR_RAIL_CHARACTERS].map((c) => [c.id, c]),
);

export const getCharacterById = (id: Character["id"]): Character | undefined => {
  return CHARACTERS_MAP.get(id);
};
