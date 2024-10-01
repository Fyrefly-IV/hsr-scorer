<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

type Props = {
  variant?: "default" | "destructive";
  class?: string;
};

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  class: "",
});
</script>

<template>
  <div
    role="alert"
    :class="
      cn(
        'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
        variant === 'default' ? 'bg-background text-foreground' : null,
        variant === 'destructive'
          ? 'border-destructive/50 bg-destructive/5 text-destructive dark:border-destructive [&>svg]:text-destructive'
          : null,
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
