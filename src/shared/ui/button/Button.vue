<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

type Props = {
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  class?: string;
};

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
  class: "",
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
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        props.variant === 'default'
          ? 'bg-primary text-primary-foreground shadow hover:bg-primary/90'
          : null,
        props.variant === 'outline'
          ? 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'
          : null,
        props.variant === 'secondary'
          ? 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80'
          : null,
        props.variant === 'destructive'
          ? 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90'
          : null,
        props.variant === 'ghost' ? 'hover:bg-accent hover:text-accent-foreground' : null,
        props.variant === 'link' ? 'text-primary underline-offset-4 hover:underline' : null,
        props.size === 'default' ? 'h-9 px-4 py-2' : null,
        props.size === 'sm' ? 'h-8 rounded-md px-3 text-xs' : null,
        props.size === 'lg' ? 'h-10 rounded-md px-8' : null,
        props.size === 'icon' ? 'aspect-square h-9 w-9' : null,
        props.class,
      )
    "
    :disabled="disabled"
    @click="clickHandler"
  >
    <slot />
  </button>
</template>
