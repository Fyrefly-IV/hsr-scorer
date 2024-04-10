import type { Character } from "@/data/characters";
import { writable, type Writable } from "svelte/store";

export const ExcludedCharacters: Writable<Character[]> = writable([]);
