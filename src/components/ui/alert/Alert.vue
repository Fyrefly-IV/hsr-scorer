<script setup lang="ts">
import { cn } from "@/lib/cn";
import type { ClassValue } from "clsx";
import { useAttrs } from "vue";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

type Props = {
  variant?: "default" | "destructive";
};

withDefaults(defineProps<Props>(), {
  variant: "default",
});
</script>

<template>
  <div
    v-bind="{ ...attrs, class: null }"
    role="alert"
    :class="
      cn(
        'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
        variant === 'default' ? 'bg-background text-foreground' : null,
        variant === 'destructive'
          ? 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-destructive/5'
          : null,
        attrs.class as ClassValue,
      )
    "
  >
    <slot></slot>
  </div>
</template>
