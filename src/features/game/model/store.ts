import { CHARACTERS_MAP } from "@/entities/character/data/characters";
import { useExcludedCharacters } from "@/entities/character/model/stores";
import type { Character } from "@/entities/character/model/types";
import { combinations, shuffleArray } from "@/shared/lib/arrays";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";
import type { HistoryEntry, QueueEntry, Scores, Stage } from "./schemas";
import {
	EDITING_QUEUE,
	FINISHED,
	HISTORY_KEY,
	IN_PROGRESS,
	QUEUE_KEY,
	SCORES_KEY,
	STAGE_KEY,
	START_SCREEN,
} from "../config";
import { pairToCharactersRequired } from "../lib/pair-to-character";

export const useGame = defineStore("the-game", () => {
	const queue = useLocalStorage<QueueEntry[]>(QUEUE_KEY, []);
	const history = useLocalStorage<HistoryEntry[]>(HISTORY_KEY, []);
	const scores = useLocalStorage<Scores>(SCORES_KEY, {});
	const stage = useLocalStorage<Stage>(STAGE_KEY, START_SCREEN);

	const firstThreePairs = computed(() => {
		return queue.value.slice(0, 3).map(pairToCharactersRequired);
	});

	const currentPair = computed(() => {
		const pair = firstThreePairs.value.at(0);
		if (!pair) {
			throw TypeError("theres no pair in queue");
		}

		return pair;
	});

	function choose(winnerId: Character["id"] | null) {
		if (queue.value.length === 0) {
			throw TypeError("nothing to choose from queue empty");
		}

		const pair = queue.value.shift();
		if (!pair) {
			throw TypeError("noclue why returned pair from queue is undefined good luck debugging");
		}

		if (winnerId !== null) {
			if (winnerId !== pair.firstId && winnerId !== pair.secondId) {
				throw new TypeError("well, you tried choosing someone who is not in current pair");
			}
			scores.value[winnerId] = (scores.value?.[winnerId] ?? 0) + 1;
		}

		const historyEntry: HistoryEntry = {
			pair: pair,
			selectedId: winnerId,
		};

		history.value.unshift(historyEntry);

		if (queue.value.length === 0) {
			stage.value = FINISHED;
		}
	}

	function undo() {
		if (history.value.length === 0) {
			throw TypeError("cant undo if nothing in history");
		}

		const entry = history.value.shift();
		if (!entry) {
			throw TypeError("history entry is undefined, but why? go debug buddy");
		}

		if (entry.selectedId) {
			const score = scores.value[entry.selectedId];
			if (score) {
				scores.value[entry.selectedId] = score - 1;
			}
		}

		queue.value.unshift(entry.pair);
	}

	function start(allowEdit: boolean = false) {
		const settings = useExcludedCharacters();

		const idsPool = Array.from(CHARACTERS_MAP.keys()).filter((id) => !settings.isExcludedId(id));
		if (idsPool.length < 2) {
			throw new Error("too character pool for new queue");
		}

		const queueIds = combinations(idsPool, 2);
		shuffleArray(queueIds);

		idsPool.forEach((id) => {
			scores.value[id] = 0;
		});

		queue.value = queueIds.map(([id1, id2]) => ({
			firstId: id1,
			secondId: id2,
		}));

		if (allowEdit === true) {
			stage.value = EDITING_QUEUE;
		} else {
			stage.value = IN_PROGRESS;
		}
	}

	function reset() {
		queue.value = [];
		history.value = [];
		scores.value = {};
		stage.value = START_SCREEN;
	}

	return {
		queue,
		history,
		scores,
		stage,
		firstThreePairs,
		currentPair,
		choose,
		undo,
		start,
		reset,
	};
});
