<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

const props = defineProps({
  class: { type: String, default: "" },
});
</script>

<template>
  <p :class="cn('leading-7 [&:not(:first-child)]:mt-4', props.class)">
    <slot />
  </p>
</template>
