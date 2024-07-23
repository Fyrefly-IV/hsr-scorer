<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();
</script>

<template>
  <main class="flex flex-col items-center justify-center min-h-screen">
    <h2 class="text-lg font-black">{{ counter.count }}</h2>

    <button
      @click="counter.increment"
      class="bg-neutral-200 text-neutral-800 cursor-pointer px-4 py-2"
    >
      increment
    </button>
  </main>
</template>
