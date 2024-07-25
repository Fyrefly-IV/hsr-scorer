<script setup lang="ts">
import { cn } from "@/lib/cn";
import type { ClassValue } from "clsx";
import { useAttrs } from "vue";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
</script>

<template>
  <p
    v-bind="{ ...attrs, class: null }"
    :class="cn('text-sm [&_p]:leading-relaxed', attrs.class as ClassValue)"
  >
    <slot></slot>
  </p>
</template>
