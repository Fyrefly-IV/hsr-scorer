<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

type Props = {
	class?: string;
};

const props = defineProps<Props>();
</script>

<template>
	<div :class="cn('flex flex-col space-y-1.5 p-6', props.class)"><slot /></div>
</template>
