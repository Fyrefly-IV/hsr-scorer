import { CHARACTERS, type StarRailCharacter } from "@/data/characters";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";
import uniq from "lodash.uniq";

export const useSettingsStore = defineStore("settings", () => {
  const excludedIds = useLocalStorage<StarRailCharacter["id"][]>("excluded-ids", []);

  const characterPool = computed(() => {
    return CHARACTERS.filter((c) => !excludedIds.value.includes(c.id));
  });

  function excludeIds(...characterIds: StarRailCharacter["id"][]) {
    excludedIds.value = uniq([...characterIds, ...excludedIds.value]);
  }

  function includeIds(...characterIds: StarRailCharacter["id"][]) {
    excludedIds.value = excludedIds.value.filter((id) => !characterIds.includes(id));
  }

  function isExcludedId(characterId: StarRailCharacter["id"]): boolean {
    return excludedIds.value.includes(characterId);
  }

  return { excludedIds, characterPool, excludeIds, includeIds, isExcludedId };
});
