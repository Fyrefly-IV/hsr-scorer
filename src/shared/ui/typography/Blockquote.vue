<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

const props = defineProps({
  class: { type: String, default: "" },
});
</script>

<template>
  <blockquote :class="cn('mt-6 border-l-2 pl-6 italic', props.class)">
    <slot />
  </blockquote>
</template>
