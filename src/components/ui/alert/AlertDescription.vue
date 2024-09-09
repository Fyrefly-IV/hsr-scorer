<script setup lang="ts">
import { cn } from "@/lib/cn";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <p :class="cn('text-sm [&_p]:leading-relaxed', props.class)">
    <slot></slot>
  </p>
</template>
