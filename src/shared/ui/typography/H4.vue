<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

const props = defineProps({
  class: { type: String, default: "" },
});
</script>

<template>
  <h4 :class="cn('scroll-m-20 text-xl font-semibold tracking-tight', props.class)">
    <slot />
  </h4>
</template>
