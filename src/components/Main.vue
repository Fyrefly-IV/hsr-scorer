<script setup lang="ts">
import { cn } from "@/lib/cn";

const props = defineProps({
  class: { type: String, default: "" },
});
</script>

<template>
  <main :class="cn('min-h-[--height-main] bg-background p-4', props.class)">
    <slot></slot>
  </main>
</template>
