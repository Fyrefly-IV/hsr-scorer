<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";
import { effect, useTemplateRef, watch } from "vue";
import { cn } from "@/shared/lib/cn";

const open = defineModel<boolean>({ required: true });
const dialogRef = useTemplateRef("dialog");

const close = () => {
	open.value = false;
};

effect(() => {
	if (open.value && dialogRef.value) {
		dialogRef.value.showModal();
	}
});

watch(
	() => open.value,
	(s) => {
		if (s === false) {
			dialogRef.value?.close();
		}
	},
);
</script>

<template>
	<Teleport to="body">
		<dialog
			ref="dialog"
			:open="open"
			class="m-auto h-full w-full items-center justify-center bg-transparent open:flex"
		>
			<div
				v-if="open === true"
				v-on-click-outside="close"
				:class="
					cn('border-border bg-background flex w-full max-w-[600px] flex-col rounded-md border p-4')
				"
			>
				<slot />
			</div>
		</dialog>
	</Teleport>
</template>

<style lang="css">
dialog::backdrop {
	background: rgba(0, 0, 0, 0.7);
}

dialog[open] {
	animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes zoom {
	from {
		transform: scale(0.95);
	}
	to {
		transform: scale(1);
	}
}

dialog[open]::backdrop {
	animation: fade 0.2s ease-out;
}

@keyframes fade {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
