<script setup lang="ts">
import { useThrottleFn } from "@vueuse/core";
import { SkipForwardIcon, UndoIcon, XIcon } from "lucide-vue-next";
import { computed, watch } from "vue";
import { useCharacterCardsOptions } from "@/entities/character/model/stores";
import type { Character } from "@/entities/character/model/types";
import CharacterCard from "@/entities/character/ui/CharacterCard.vue";
import Button from "@/shared/ui/button/Button.vue";
import { useGame } from "@/features/game/model/store";

const emit = defineEmits(["confirmReset"]);

const game = useGame();
const cardOptions = useCharacterCardsOptions();

const canUndo = computed(() => game.history.length > 0);

const chooseThrottled = useThrottleFn((winnerId: Character["id"]) => {
	game.choose(winnerId);
}, 200);

const skipThrottled = useThrottleFn(() => {
	game.choose(null);
}, 200);

const undo = () => {
	if (canUndo.value) {
		game.undo();
	}
};

// preload next pair portraits
watch(
	() => game.firstThreePairs?.[1],
	(nextPair) => {
		if (!nextPair) {
			return;
		}

		nextPair.forEach((character) => {
			if (character.assets.portrait) {
				const img = new Image();
				img.src = character.assets.portrait;
			}
		});
	},
	{ immediate: true },
);
</script>

<template>
	<div class="w-fit max-w-[600px]">
		<div
			v-if="game.currentPair != null"
			class="grid w-fit grid-cols-[minmax(0,250px)] place-items-center gap-4 sm:grid-cols-[repeat(2,minmax(0,250px))]"
		>
			<button
				v-for="ch in game.currentPair"
				:key="`pair-${ch.id}`"
				class="w-[clamp(10.9375rem,_10.3448vw_+_8.9978rem,_15.625rem)] lg:size-full"
				@click="() => chooseThrottled(ch.id)"
			>
				<CharacterCard
					:character="ch"
					:show-path="cardOptions.showPaths"
					:show-type="cardOptions.showTypes"
				/>
			</button>
		</div>
		<div class="mt-6 flex w-full items-center justify-between">
			<Button variant="ghost" size="icon" :disabled="!canUndo" @click="undo">
				<UndoIcon class="size-6" />
				<span class="sr-only">Undo</span>
			</Button>

			<span class="text-muted-foreground text-sm sm:text-base">
				<span>{{ game.queue.length }}</span>
				<span class="hidden sm:inline"> pairs</span>
				<span> left</span>
			</span>
			<div className="flex items-center gap-4">
				<Button variant="ghost" size="icon" @click="skipThrottled">
					<SkipForwardIcon class="size-6" />
					<span className="sr-only">Skip</span>
				</Button>
				<Button variant="destructive" size="icon" @click="emit('confirmReset')">
					<XIcon class="size-6" />
					<span class="sr-only">Stop Comparing</span>
				</Button>
			</div>
		</div>
	</div>
</template>
