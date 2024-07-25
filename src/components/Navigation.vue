<script setup lang="ts">
import Button from "./ui/Button.vue";
import { HomeIcon, SettingsIcon } from "lucide-vue-next";

const nav = [
  {
    icon: HomeIcon,
    name: "Home",
    href: "/",
  },
  {
    icon: SettingsIcon,
    name: "Settings",
    href: "/settings",
  },
];
</script>

<template>
  <nav class="fixed left-4 top-4 z-[10] flex flex-row gap-3">
    <RouterLink v-for="endpoint in nav" :key="endpoint.href" :to="endpoint.href">
      <Button variant="outline" size="icon">
        <component :is="endpoint.icon" class="size-4" />
      </Button>
    </RouterLink>
  </nav>
</template>
