<script setup lang="ts">
import { HomeIcon, SettingsIcon } from "lucide-vue-next";
import { Button } from "@/shared/ui/button";
import { GithubIcon } from "@/shared/ui/icons";

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
  <header
    class="sticky top-0 z-50 h-[--height-header] bg-background supports-[backdrop-filter]:bg-background/80 supports-[backdrop-filter]:backdrop-blur-md"
  >
    <div class="container flex h-full flex-row items-center">
      <nav class="flex flex-row gap-2">
        <RouterLink v-for="endpoint in nav" :key="endpoint.href" :to="endpoint.href">
          <Button variant="outline" size="icon">
            <component :is="endpoint.icon" class="size-4" />
          </Button>
        </RouterLink>
      </nav>

      <div class="flex flex-1 justify-end gap-2">
        <a href="https://github.com/mk26710/hsr-scorer" target="_blank" rel="noreferrer">
          <Button variant="ghost" size="icon">
            <GithubIcon class="size-4" />
          </Button>
        </a>
      </div>
    </div>
  </header>
</template>
