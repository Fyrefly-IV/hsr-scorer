<script setup lang="ts">
import { cn } from "@/lib/cn";
import type { ClassValue } from "clsx";
</script>

<template>
  <h3 :class="cn('scroll-m-20 text-2xl font-semibold tracking-tight', $attrs.class as ClassValue)">
    <slot></slot>
  </h3>
</template>
