import { useLocalStorage, usePreferredColorScheme } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, watch } from "vue";
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

	function setThemeAuto() {
		selectedTheme.value = "no-preference";
	}

	function setThemeDark() {
		selectedTheme.value = "dark";
	}

	function setThemeLight() {
		selectedTheme.value = "light";
	}

	function switchTheme() {
		if (isDark.value === true) {
			setThemeLight();
		} else {
			setThemeDark();
		}
	}

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

	return {
		preferredTheme,
		selectedTheme,
		displayedTheme,
		isDark,
		setThemeAuto,
		setThemeDark,
		setThemeLight,
		switchTheme,
	};
});
