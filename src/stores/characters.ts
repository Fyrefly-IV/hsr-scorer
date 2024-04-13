import { isCharacterArray, type Character } from "@/data/characters";
import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

const STORAGE_KEY = "excluded-characters";

export const ExcludedCharacters: Writable<Character[]> = writable(getInitialState());

ExcludedCharacters.subscribe((value) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value)));

function getInitialState(): Character[] {
  if (!browser) {
    return [];
  }

  const savedRawData = localStorage.getItem(STORAGE_KEY);
  if (savedRawData == null) {
    return [];
  }

  const savedJsonData = JSON.parse(savedRawData);
  if (!Array.isArray(savedJsonData)) {
    return [];
  }

  // there's no way user can have more than 100 entries
  if (savedJsonData.length > 100) {
    return [];
  }

  if (!isCharacterArray(savedJsonData)) {
    return [];
  }

  return savedJsonData;
}
