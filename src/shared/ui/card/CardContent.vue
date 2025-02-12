<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

type Props = {
	class?: string;
};

const props = defineProps<Props>();
</script>

<template>
	<div :class="cn('p-6 pt-0', props.class)"><slot /></div>
</template>
