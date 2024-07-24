<script setup lang="ts">
import { cn } from "@/lib/cn";
import type { ClassValue } from "clsx";
</script>

<template>
  <h4 :class="cn('scroll-m-20 text-xl font-semibold tracking-tight', $attrs.class as ClassValue)">
    <slot></slot>
  </h4>
</template>
