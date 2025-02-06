import { z } from "zod";

export const ThemeSchema = z.union([
	z.literal("no-preference"),
	z.literal("dark"),
	z.literal("light"),
]);

export type Theme = z.infer<typeof ThemeSchema>;
