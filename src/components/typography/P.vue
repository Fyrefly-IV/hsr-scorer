<script setup lang="ts">
import { cn } from "@/lib/cn";
import type { ClassValue } from "clsx";
</script>

<template>
  <p :class="cn('leading-7 [&:not(:first-child)]:mt-4', $attrs.class as ClassValue)">
    <slot></slot>
  </p>
</template>
