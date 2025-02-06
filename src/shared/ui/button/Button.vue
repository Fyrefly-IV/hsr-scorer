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
				'focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
				props.variant === 'default'
					? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
					: null,
				props.variant === 'outline'
					? 'border-input bg-background hover:bg-accent hover:text-accent-foreground border shadow-xs'
					: null,
				props.variant === 'secondary'
					? 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs'
					: null,
				props.variant === 'destructive'
					? 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs'
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
