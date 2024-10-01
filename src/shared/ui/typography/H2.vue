<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

const props = defineProps({
  class: { type: String, default: "" },
});
</script>

<template>
  <h2 :class="cn('scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0', props.class)">
    <slot />
  </h2>
</template>
