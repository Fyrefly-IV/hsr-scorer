import type { StarRailCharacter } from "../model/types";
import { STAR_RAIL_CHARACTERS } from "./star-rail";

export const CHARACTERS_MAP: Map<StarRailCharacter["id"], StarRailCharacter> = new Map(
  [...STAR_RAIL_CHARACTERS].map((c) => [c.id, c]),
);

export const getCharacterById = (id: StarRailCharacter["id"]): StarRailCharacter | undefined => {
  return CHARACTERS_MAP.get(id);
};
