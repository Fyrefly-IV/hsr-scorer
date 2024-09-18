import { useLocalStorage } from "@vueuse/core";
import uniq from "lodash.uniq";
import { defineStore } from "pinia";
import type { Character } from "./types";

export const useExcludedCharacters = defineStore("exlcuded-characters", () => {
  const excludedIds = useLocalStorage<Character["id"][]>("excluded-ids", []);

  function excludeIds(...characterIds: Character["id"][]) {
    excludedIds.value = uniq([...characterIds, ...excludedIds.value]);
  }

  function includeIds(...characterIds: Character["id"][]) {
    excludedIds.value = excludedIds.value.filter((id) => !characterIds.includes(id));
  }

  function isExcludedId(characterId: Character["id"]): boolean {
    return excludedIds.value.includes(characterId);
  }

  return { excludedIds, excludeIds, includeIds, isExcludedId };
});

export const useCharacterCardsOptions = defineStore("character-cards-options", () => {
  const showTypes = useLocalStorage<boolean>("character-cards-show-types", true);
  const showPaths = useLocalStorage<boolean>("character-cards-show-paths", false);

  return { showTypes, showPaths };
});
