import { CHARACTERS, type StarRailCharacter } from "@/data/characters";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const excludedIds = useLocalStorage<StarRailCharacter["id"][]>("excluded-ids", []);

  const characterPool = computed(() => {
    return CHARACTERS.filter((c) => !excludedIds.value.includes(c.id));
  });

  function excludeId(characterId: StarRailCharacter["id"]) {
    excludedIds.value = [characterId, ...excludedIds.value];
  }

  function includeId(characterId: StarRailCharacter["id"]) {
    excludedIds.value = excludedIds.value.filter((id) => id !== characterId);
  }

  function isExcludedId(characterId: StarRailCharacter["id"]): boolean {
    return excludedIds.value.includes(characterId);
  }

  return { excludedIds, characterPool, excludeId, includeId, isExcludedId };
});
