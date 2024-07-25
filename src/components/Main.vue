<script setup lang="ts">
import { cn } from "@/lib/cn";
import type { ClassValue } from "clsx";
</script>

<template>
  <main :class="cn('min-h-screen p-4 bg-background', $attrs.class as ClassValue)">
    <slot></slot>
  </main>
</template>
