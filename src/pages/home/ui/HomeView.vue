<script setup lang="ts">
import Main from "@/shared/ui/main/Main.vue";
import Button from "@/shared/ui/button/ui/Button.vue";
import { RouterLink } from "vue-router";
import { PlayIcon, SettingsIcon } from "lucide-vue-next";
</script>

<template>
  <Main class="flex flex-col items-center justify-center">
    <div class="flex flex-col">
      <h1 class="text-5xl font-black">Honkai Scorer</h1>
      <div class="mt-4 flex flex-col gap-2">
        <RouterLink to="/full-compare">
          <Button size="lg" class="w-full">
            <PlayIcon class="h-4" />
            <span>Play</span>
          </Button>
        </RouterLink>

        <RouterLink to="/settings">
          <Button variant="outline" size="lg" class="w-full gap-2">
            <SettingsIcon class="size-4" />
            <span>Settings</span>
          </Button>
        </RouterLink>
      </div>
    </div>
  </Main>
</template>
