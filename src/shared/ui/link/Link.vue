<script setup lang="ts">
import { cn } from "@/shared/lib/cn";

type Props = {
	href: HTMLAnchorElement["href"];
	target?: HTMLAnchorElement["target"];
	class?: string;
};

const { href, target = "_blank", ...props } = defineProps<Props>();
</script>

<template>
	<a
		:href="href"
		:target="target"
		rel="noreferrer"
		:class="cn('font-medium underline underline-offset-2', props.class)"
	>
		<slot></slot>
	</a>
</template>
