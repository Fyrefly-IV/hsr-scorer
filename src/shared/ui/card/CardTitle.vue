<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

type Props = {
	class?: string;
};

const props = defineProps<Props>();
</script>

<template>
	<div :class="cn('leading-none font-semibold tracking-tight', props.class)"><slot /></div>
</template>
