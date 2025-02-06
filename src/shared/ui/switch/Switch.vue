<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

const modelValue = defineModel<boolean>({ default: false });

const props = defineProps({
	class: { type: String, required: false, default: "" },
});
</script>

<template>
	<button
		:data-state="modelValue === true ? 'checked' : 'unchecked'"
		:class="
			cn(
				'group focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
				props.class,
			)
		"
		@click="modelValue = !modelValue"
	>
		<span
			:class="
				cn(
					'bg-background pointer-events-none block h-5 w-5 rounded-full ring-0 shadow-lg transition-transform group-data-[state=checked]:translate-x-5 group-data-[state=unchecked]:translate-x-0',
				)
			"
		/>
	</button>
</template>
