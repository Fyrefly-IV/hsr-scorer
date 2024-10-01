<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

const props = defineProps({
  class: { type: String, default: "" },
});
</script>

<template>
  <h3 :class="cn('scroll-m-20 text-2xl font-semibold tracking-tight', props.class)">
    <slot />
  </h3>
</template>
