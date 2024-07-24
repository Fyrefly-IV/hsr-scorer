import { CHARACTERS, type Character } from "@/data/characters";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const excludedIds = useLocalStorage<Character["id"][]>("excluded-ids", []);

  const characterPool = computed(() => {
    return CHARACTERS.filter((c) => !excludedIds.value.includes(c.id));
  });

  function excludeId(characterId: Character["id"]) {
    excludedIds.value = [characterId, ...excludedIds.value];
  }

  function includeId(characterId: Character["id"]) {
    excludedIds.value = excludedIds.value.filter((id) => id !== characterId);
  }

  function isExcludedId(characterId: Character["id"]): boolean {
    return excludedIds.value.includes(characterId);
  }

  return { excludedIds, characterPool, excludeId, includeId, isExcludedId };
});
