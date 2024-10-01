<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

const props = defineProps({
  class: { type: String, default: "" },
});
</script>

<template>
  <p :class="cn('text-sm [&_p]:leading-relaxed', props.class)">
    <slot />
  </p>
</template>
