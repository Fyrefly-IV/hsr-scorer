import { z } from "zod";
import { GAME_GENSHIN, GAME_STAR_RAIL, GAME_ZENLESS } from "../config/games";

export const GameSchema = z.union([
	z.literal(GAME_STAR_RAIL),
	z.literal(GAME_GENSHIN),
	z.literal(GAME_ZENLESS),
]);
