<script setup lang="ts">
import type { ClassValue } from "clsx";
import { cn } from "@/lib/cn";
import { useAttrs } from "vue";

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const model = defineModel();
</script>

<template>
  <input
    v-bind="{ ...attrs, class: null }"
    v-model="model"
    :class="
      cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        attrs.class as ClassValue,
      )
    "
  />
</template>
