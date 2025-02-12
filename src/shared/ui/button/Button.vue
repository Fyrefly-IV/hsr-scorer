<script setup lang="ts">
import { cn } from "@/shared/lib/cn";
import { computed } from "vue";

type Props = {
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
	size?: "default" | "sm" | "lg" | "icon";
	disabled?: boolean;
	class?: string;
};

const props = withDefaults(defineProps<Props>(), {
	variant: "default",
	size: "default",
});

type Emits = {
	click: [payload?: MouseEvent];
};

const emit = defineEmits<Emits>();

const baseStyles =
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const variantStyles = {
	default: "bg-primary text-primary-foreground hover:bg-primary/90",
	destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
	outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
	secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
	ghost: "hover:bg-accent hover:text-accent-foreground",
	link: "text-primary underline-offset-4 hover:underline",
};

const sizeStyles = {
	default: "h-9 px-4 py-2",
	sm: "h-8 rounded-md px-3 text-xs",
	lg: "h-10 rounded-md px-8",
	icon: "h-9 w-9",
};

const classes = computed(() =>
	cn(baseStyles, variantStyles[props.variant], sizeStyles[props.size], props.class),
);

const clickHandler = (e: MouseEvent) => {
	emit("click", e);
};
</script>

<template>
	<button :class="classes" :disabled="disabled" @click="clickHandler">
		<slot />
	</button>
</template>
