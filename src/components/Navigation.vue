<script setup lang="ts">
import HomeIcon from "@/components/icons/HomeIcon.vue";
import GearIcon from "@/components/icons/GearIcon.vue";

const nav = [
  {
    icon: HomeIcon,
    name: "Home",
    href: "/",
  },
  {
    icon: GearIcon,
    name: "Settings",
    href: "/settings",
  },
];
</script>

<template>
  <nav class="fixed left-4 top-4 z-[10] flex flex-row gap-3">
    <RouterLink
      v-for="endpoint in nav"
      :key="endpoint.href"
      :to="endpoint.href"
      class="flex h-9 items-center justify-center rounded-md border box-border border-neutral-800 px-3 transition-all duration-200 ease-in-out hover:bg-neutral-800"
    >
      <component :is="endpoint.icon" />
    </RouterLink>
  </nav>
</template>
