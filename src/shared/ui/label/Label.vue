<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

type Props = {
	class?: string;
};

const props = defineProps<Props>();
</script>

<template>
	<label
		:class="
			cn(
				'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
				props.class,
			)
		"
	>
		<slot />
	</label>
</template>
