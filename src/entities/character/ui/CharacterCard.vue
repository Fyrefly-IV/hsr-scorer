<script setup lang="ts">
import { SparklesIcon } from "lucide-vue-next";
import { computed } from "vue";
import { cn } from "@/shared/lib/cn";
import type { StarRailCharacter } from "../model/types";

type Props = {
	character: StarRailCharacter;
	hideName?: boolean;
	textUnderName?: string;
	decoration?: boolean;
	showType?: boolean;
	showPath?: boolean;
	rarityBg?: boolean;
	class?: string;
};

const props = withDefaults(defineProps<Props>(), {
	textUnderName: undefined,
	class: "",
});

const cssVars = computed(() => {
	return {
		"--top": props.character.rarity === 5 ? "hsl(5, 26%, 42%)" : "hsl(237, 26%, 28%)",
		"--bottom": props.character.rarity === 5 ? "hsl(36, 47%, 60%)" : "hsl(264, 52%, 59%)",
	};
});
</script>

<template>
	<article
		:data-rarity-bg="props.rarityBg"
		:style="cssVars"
		:class="
			cn(
				'card border-border bg-secondary dark:bg-secondary/35 relative overflow-hidden rounded-md border data-[rarity-bg=true]:bg-linear-to-b data-[rarity-bg=true]:from-(--top) data-[rarity-bg=true]:to-(--bottom)',
				props.class,
			)
		"
	>
		<img
			:src="character.assets.portrait ?? undefined"
			class="card-thumbnail aspect-376/512 h-full w-full object-cover"
			draggable="false"
			decoding="async"
			loading="lazy"
		/>

		<div
			v-if="showPath === true || showType === true"
			class="absolute top-0 left-0 flex w-full justify-between px-1 pt-1 [&_img]:drop-shadow-[0_1px_1px_#000]"
		>
			<img
				v-if="showType"
				:src="`/img/hsr/ui/${character.type.toLowerCase()}.webp`"
				class="aspect-square size-8"
			/>
			<img
				v-if="showPath"
				:src="`/img/hsr/ui/${character.path.toLowerCase()}.webp`"
				class="aspect-square size-8"
			/>
		</div>

		<div
			v-if="hideName !== true"
			class="absolute right-0 bottom-0 left-0 flex w-full flex-col items-center bg-black/50 pt-3 pb-3.5 has-[p]:pt-2 has-[p]:pb-2.5"
		>
			<h3 class="font-anuphane relative text-lg leading-none font-semibold text-white">
				<SparklesIcon
					v-if="decoration"
					class="absolute -top-2 -left-2.5 h-4 w-4 text-emerald-400 opacity-75"
				/>
				<span>{{ character.name }}</span>
			</h3>
			<p v-if="typeof textUnderName === 'string' && textUnderName.length > 0">
				{{ textUnderName }}
			</p>
		</div>
	</article>
</template>

<style lang="css" scoped>
button .card-thumbnail {
	transition-property: transform;
	transition-duration: 300ms;
	transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}

button:hover .card-thumbnail,
button:active .card-thumbnail {
	transform: scale(1.05);
}
</style>
