<script setup lang="ts">
import { cn } from "@/lib/cn";
import type { ClassValue } from "clsx";

type Props = {
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
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
        'focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
        props.variant === 'default'
          ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow'
          : null,
        props.variant === 'outline'
          ? 'border-input bg-background hover:bg-accent hover:text-accent-foreground border shadow-sm'
          : null,
        props.variant === 'secondary'
          ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm'
          : null,
        props.variant === 'destructive'
          ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm'
          : null,
        props.variant === 'ghost' ? 'hover:bg-accent hover:text-accent-foreground' : null,
        props.variant === 'link' ? '' : null,
        props.size === 'default' ? 'h-9 px-4 py-2' : null,
        props.size === 'sm' ? 'h-8 px-3 text-xs' : null,
        props.size === 'lg' ? 'h-10 px-8' : null,
        props.size === 'icon' ? 'h-9 w-9' : null,
        $attrs.class as ClassValue,
      )
    "
    @click="clickHandler"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
