import { useLocalStorage, usePreferredColorScheme } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, watch, watchEffect } from "vue";
import type { Theme } from "./theme.types";

export const useThemeStore = defineStore("theme", () => {
  const preferredTheme = usePreferredColorScheme();
  const selectedTheme = useLocalStorage<Theme>("theme", "no-preference");

  const displayedTheme = computed(() => {
    if (selectedTheme.value === "no-preference") {
      return preferredTheme.value;
    }

    return selectedTheme.value;
  });

  const isDark = computed(() => {
    return displayedTheme.value === "dark";
  });

  const setThemeAuto = () => {
    selectedTheme.value = "no-preference";
  };

  const setThemeDark = () => {
    selectedTheme.value = "dark";
  };

  const setThemeLight = () => {
    selectedTheme.value = "light";
  };

  watch(
    () => isDark.value,
    (value) => {
      console.log(`isDark - ${value}`);

      if (value === true) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    { immediate: true },
  );

  watchEffect(() => {
    console.table({
      preferredTheme: preferredTheme.value,
      selectedTheme: selectedTheme.value,
      displayedTheme: displayedTheme.value,
      isDark: isDark.value,
    });
  });

  return {
    preferredTheme,
    selectedTheme,
    displayedTheme,
    isDark,
    setThemeAuto,
    setThemeDark,
    setThemeLight,
  };
});
