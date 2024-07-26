import type { Character } from "@/data/schemas";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import uniq from "lodash.uniq";

export const useSettingsStore = defineStore("settings", () => {
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
