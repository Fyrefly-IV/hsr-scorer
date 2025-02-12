<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

type Props = {
	class?: string;
};

const props = defineProps<Props>();
</script>

<template>
	<div
		:class="cn('bg-card text-card-foreground border-border rounded-xl border shadow', props.class)"
	>
		<slot />
	</div>
</template>
