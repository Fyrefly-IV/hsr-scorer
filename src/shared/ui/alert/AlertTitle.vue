<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

const props = defineProps({
	class: { type: String, default: "" },
});
</script>

<template>
	<h5 :class="cn('mb-1 text-lg leading-none font-bold tracking-tight', props.class)">
		<slot />
	</h5>
</template>
