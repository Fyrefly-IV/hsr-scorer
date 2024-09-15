import type { Character } from "../model/types";
import { STAR_RAIL_CHARACTERS } from "./star-rail";

export const CHARACTERS_MAP: Map<Character["id"], Character> = new Map(
  [...STAR_RAIL_CHARACTERS].map((c) => [c.id, c]),
);

export const getCharacterById = (id: Character["id"]): Character | undefined => {
  return CHARACTERS_MAP.get(id);
};
