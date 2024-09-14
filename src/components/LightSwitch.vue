<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import Button from "../shared/ui/button/ui/Button.vue";
import { MoonStarIcon, SunIcon } from "lucide-vue-next";
import { computed, watch } from "vue";

const theme = useLocalStorage<"dark" | "light">("scorer-theme", "dark");
const isDark = computed(() => theme.value === "dark");

const handleLightSwitchClick = () => {
  if (theme.value === "dark") {
    theme.value = "light";
  } else {
    theme.value = "dark";
  }
};

watch(
  () => isDark.value,
  (value) => {
    if (value === true) {
      if (!document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.add("dark");
      }
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
);
</script>

<template>
  <Button variant="ghost" size="icon" @click="handleLightSwitchClick">
    <MoonStarIcon v-if="isDark" class="size-4" />
    <SunIcon v-else class="size-4" />
  </Button>
</template>
