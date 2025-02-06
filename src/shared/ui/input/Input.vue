<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

const model = defineModel<string | number>();

const props = defineProps({
	class: { type: String, default: "" },
});
</script>

<template>
	<input
		v-model="model"
		:class="
			cn(
				'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
				props.class,
			)
		"
	/>
</template>
