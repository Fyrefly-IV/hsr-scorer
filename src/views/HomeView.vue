<script setup lang="ts">
import Main from "@/components/Main.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <Main class="flex flex-col items-center justify-center">
    <div class="flex flex-col">
      <h1 class="text-5xl font-black">Honkai Scorer</h1>
      <div class="mt-4 flex flex-col gap-2">
        <RouterLink
          to="/settings"
          class="flex h-9 items-center justify-center rounded-md bg-neutral-200 text-sm font-bold text-neutral-800 duration-100 hover:bg-neutral-300"
        >
          Settings
        </RouterLink>

        <RouterLink
          to="/full-compare"
          class="flex h-9 items-center justify-center rounded-md bg-neutral-200 text-sm font-bold text-neutral-800 duration-100 hover:bg-neutral-300"
        >
          Full Compare
        </RouterLink>
      </div>
    </div>
  </Main>
</template>
