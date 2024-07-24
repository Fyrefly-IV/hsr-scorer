<script setup lang="ts">
import { cn } from "@/lib/cn";
import type { ClassValue } from "clsx";

type Props = {
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
});

type Emits = {
  click: [payload?: MouseEvent];
};

const emit = defineEmits<Emits>();

const clickHandler = (e: MouseEvent) => {
  emit("click", e);
};
</script>

<template>
  <button
    :class="
      cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50',
        props.variant === 'default' ? 'bg-neutral-200 text-neutral-800 hover:bg-neutral-400' : null,
        props.variant === 'outline'
          ? 'border border-neutral-800 bg-neutral-900 hover:bg-neutral-800'
          : null,
        props.variant === 'secondary'
          ? 'bg-neutral-800 text-neutral-200 hover:bg-neutral-800/75'
          : null,
        props.size === 'default' ? 'h-9 px-4 py-2' : null,
        props.size === 'sm' ? 'h-8 px-3 text-xs' : null,
        props.size === 'lg' ? 'h-10 px-8' : null,
        props.size === 'icon' ? 'h-9 w-9' : null,
        $attrs.class as ClassValue,
      )
    "
    @click="clickHandler"
  >
    <slot></slot>
  </button>
</template>
