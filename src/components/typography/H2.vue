<script setup lang="ts">
import { cn } from "@/lib/cn";
import type { ClassValue } from "clsx";
</script>

<template>
  <h2
    :class="
      cn(
        'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        $attrs.class as ClassValue,
      )
    "
  >
    <slot></slot>
  </h2>
</template>
