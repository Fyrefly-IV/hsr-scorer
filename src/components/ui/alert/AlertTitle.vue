<script setup lang="ts">
import { cn } from "@/lib/cn";
import type { ClassValue } from "clsx";
import { useAttrs } from "vue";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
</script>

<template>
  <h5
    v-bind="{ ...attrs, class: null }"
    :class="cn('mb-1 font-bold text-lg leading-none tracking-tight', attrs.class as ClassValue)"
  >
    <slot></slot>
  </h5>
</template>
