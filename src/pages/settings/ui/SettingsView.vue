<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { refDebounced } from "@vueuse/core";
import { RefreshCwIcon } from "lucide-vue-next";
import { computed, ref } from "vue";
import { FILTERS } from "../config/filters";
import { STAR_RAIL_CHARACTERS } from "@/entities/character/data/star-rail";
import { useCharacterCardsOptions, useExcludedCharacters } from "@/entities/character/model/stores";
import type { Character } from "@/entities/character/model/types";
import CharacterCard from "@/entities/character/ui/CharacterCard.vue";
import { cn } from "@/shared/lib/cn";
import Alert from "@/shared/ui/alert/Alert.vue";
import AlertDescription from "@/shared/ui/alert/AlertDescription.vue";
import AlertTitle from "@/shared/ui/alert/AlertTitle.vue";
import Button from "@/shared/ui/button/Button.vue";
import Input from "@/shared/ui/input/Input.vue";
import Switch from "@/shared/ui/switch/Switch.vue";
import { useGame } from "@/features/game/model/store";
import Card from "@/shared/ui/card/Card.vue";
import CardHeader from "@/shared/ui/card/CardHeader.vue";
import CardTitle from "@/shared/ui/card/CardTitle.vue";
import CardContent from "@/shared/ui/card/CardContent.vue";
import Label from "@/shared/ui/label/Label.vue";
import type { Filter } from "../model/types";
import { storeToRefs } from "pinia";

const game = useGame();
const cardOptions = useCharacterCardsOptions();

const settings = useExcludedCharacters();
const { excludedIds } = storeToRefs(settings);

const characterClickHandler = (id: Character["id"]) => {
	if (!settings.isExcludedId(id)) {
		settings.excludeIds(id);
	} else {
		settings.includeIds(id);
	}
};

function selectAllCharacters() {
	excludedIds.value = [];
}

function deselectAllCharacters() {
	excludedIds.value = STAR_RAIL_CHARACTERS.map((character) => character.id);
}

const hsrSearchValue = ref<string>("");
const hsrSearchDebounced = refDebounced(hsrSearchValue, 200);

const activeFilters = ref<Filter[]>([]);

function isFilterActive(filterId: Filter["id"]) {
	return activeFilters.value.some((activeFilter) => activeFilter.id === filterId);
}

function enableFilter(filter: Filter) {
	activeFilters.value.push(filter);
}

function disableFilter(filterId: string) {
	activeFilters.value = activeFilters.value.filter((filter) => filter.id !== filterId);
}

function resetFilters() {
	hsrSearchValue.value = "";
	activeFilters.value = [];
}

function handleFilterClick(filter: Filter) {
	if (isFilterActive(filter.id)) {
		disableFilter(filter.id);
	} else {
		enableFilter(filter);
	}
}

const displayedCharacters = computed(() => {
	const fieldGroups = activeFilters.value.reduce((groups, { field, value }) => {
		if (!groups.has(field)) {
			groups.set(field, new Set<string>());
		}

		groups.get(field)!.add(value);

		return groups;
	}, new Map<Filter["field"], Set<string>>());

	return STAR_RAIL_CHARACTERS.filter((character) => {
		const searchActive = hsrSearchDebounced.value.trim().length > 0;
		const matchesSearch = searchActive
			? character.name.toLowerCase().includes(hsrSearchDebounced.value.trim().toLowerCase())
			: true;

		const filtersActive = fieldGroups.size > 0;

		const matchesFieldFilters =
			!filtersActive ||
			Array.from(fieldGroups.entries()).some(([field, allowedValues]) => {
				const charValue = character[field as keyof Character];
				return allowedValues.has(charValue as string);
			});

		return matchesSearch && matchesFieldFilters;
	});
});

useHead({
	title: "Honkai Scorer | Settings",
});
</script>

<template>
	<main class="min-h-svh-main container mx-auto py-4">
		<h1 class="mb-6 text-3xl font-bold">Settings</h1>

		<Card class="mb-6">
			<CardHeader>
				<CardTitle class="text-2xl font-semibold">Character Card Display</CardTitle>
			</CardHeader>
			<CardContent class="flex flex-col items-start space-y-6">
				<Label class="flex items-center justify-center gap-4">
					<Switch v-model="cardOptions.showTypes" />
					<div>
						<span class="font-medium">Show Type</span>
						<p class="text-muted-foreground text-sm">Display character types on cards</p>
					</div>
				</Label>
				<Label class="flex items-center justify-center gap-4">
					<Switch v-model="cardOptions.showPaths" />
					<div>
						<span class="font-medium">Show Paths</span>
						<p class="text-muted-foreground text-sm">Display character paths on cards</p>
					</div>
				</Label>
			</CardContent>
		</Card>

		<Alert
			v-if="game.stage === 'EDITING_QUEUE' || game.stage === 'IN_PROGRSS'"
			variant="destructive"
			class="mb-6"
		>
			<AlertTitle>You are currently in game!</AlertTitle>
			<AlertDescription>
				While a game is in progress changes to the character pool are not going to affect your
				current game.
			</AlertDescription>
		</Alert>

		<Card>
			<CardHeader>
				<CardTitle class="text-2xl font-semibold">Character Selection</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="mb-4 flex gap-x-2">
					<Input v-model="hsrSearchValue" placeholder="Enter character name" />
					<Button variant="secondary" @click="resetFilters">
						<RefreshCwIcon />
						<span>Reset</span>
					</Button>
				</div>

				<div class="mb-6 flex flex-wrap gap-2">
					<Button variant="secondary" @click="selectAllCharacters()">Select All</Button>
					<Button variant="secondary" @click="deselectAllCharacters()">Deselect All</Button>

					<Button
						v-for="filter in FILTERS"
						:key="filter.id"
						:variant="!isFilterActive(filter.id) ? 'outline' : 'secondary'"
						@click="handleFilterClick(filter)"
						size="icon"
					>
						<img :src="`/img/hsr/ui/${filter.value.toLowerCase()}.webp`" class="h-5.5" />
					</Button>
				</div>

				<div class="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
					<button
						v-for="character in displayedCharacters"
						:key="character.id"
						@click="characterClickHandler(character.id)"
						:class="
							cn(
								'cursor-pointer transition-transform',
								settings.isExcludedId(character.id) && 'scale-95 opacity-60',
							)
						"
					>
						<CharacterCard
							:character="character"
							:show-type="cardOptions.showTypes"
							:show-path="cardOptions.showPaths"
						/>
					</button>
				</div>
			</CardContent>
		</Card>
	</main>
</template>
