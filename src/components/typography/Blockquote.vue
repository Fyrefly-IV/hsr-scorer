<script setup lang="ts">
import { cn } from "@/lib/cn";
import type { ClassValue } from "clsx";
</script>

<template>
  <blockquote :class="cn('mt-6 border-l-2 pl-6 italic', $attrs.class as ClassValue)">
    <slot></slot>
  </blockquote>
</template>
