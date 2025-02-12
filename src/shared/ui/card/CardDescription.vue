<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

type Props = {
	class?: string;
};

const props = defineProps<Props>();
</script>

<template>
	<div :class="cn('text-muted-foreground text-sm', props.class)"><slot /></div>
</template>
