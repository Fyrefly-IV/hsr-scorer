import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";
import { CHARACTERS_MAP } from "@/entities/character/data/characters";
import { useExcludedCharacters } from "@/entities/character/model/stores";
import type { StarRailCharacter } from "@/entities/character/model/types";
import { combinations, shuffleArray } from "@/shared/lib/arrays";
import { getObjectValue } from "@/shared/lib/get-object-value";
import { isNil } from "@/shared/lib/is-nil";
import { QueueIDsEntrySchema } from "./schemas";
import type { ChoiceEntry, QueueIDsEntry, Scores, ScreenState } from "./types";

export class TooSmallCharacterPool extends Error {
  constructor() {
    super();
    this.name = "TooSmallPool";
  }
}

export const useGameStore = defineStore("game", () => {
  const queueIDs = useLocalStorage<QueueIDsEntry[]>("queue-ids", []);
  const choices = useLocalStorage<ChoiceEntry[]>("choices", []);
  const scores = useLocalStorage<Scores>("scores", {});

  const _screen = useLocalStorage<ScreenState>("screen", "start");
  const screen = computed(() => _screen.value);

  const currentIdPair = computed(() => {
    if (queueIDs.value.length === 0) {
      return null;
    }

    return queueIDs.value[0];
  });

  const currentPair = computed<[StarRailCharacter, StarRailCharacter] | null>(() => {
    if (queueIDs.value.length === 0) {
      return null;
    }

    const [a, b] = queueIDs.value[0];

    const characterA = CHARACTERS_MAP.get(a);
    const characterB = CHARACTERS_MAP.get(b);

    if (isNil(characterA) || isNil(characterB)) {
      return null;
    }

    return [characterA, characterB];
  });

  // when winnerId is null that means user skips pair
  function choose(winnerId: StarRailCharacter["id"] | null, autoFinish: boolean = true) {
    const pair = currentIdPair.value;
    if (isNil(pair)) {
      throw Error("there is no current pair, cannot make a choice!");
    }

    if (!pair.some((id) => id === winnerId) && !isNil(winnerId)) {
      throw Error(`provided winnerId is not present in current pair ${pair}`);
    }

    if (!isNil(winnerId)) {
      scores.value[winnerId] = (getObjectValue(scores.value, winnerId) ?? 0) + 1;
    }
    choices.value = [{ pair, winnerId }, ...choices.value];
    queueIDs.value = queueIDs.value.slice(1);

    if (autoFinish === true && queueIDs.value.length === 0) {
      _screen.value = "results";
    }
  }

  function skip(autoFinish: boolean = true) {
    choose(null, autoFinish);
  }

  function undo() {
    if (choices.value.length === 0) {
      throw Error("there are no choices entries, cannot undo");
    }

    const latestChoice = choices.value[0];

    choices.value = choices.value.slice(1);
    queueIDs.value = [latestChoice.pair, ...queueIDs.value];

    if (isNil(latestChoice.winnerId)) {
      return;
    }

    const score = getObjectValue(scores.value, latestChoice.winnerId);
    if (score != null) {
      scores.value[latestChoice.winnerId] = score - 1;
    }
  }

  function start() {
    const settings = useExcludedCharacters();
    const excludedIds = settings.excludedIds;

    const poolIds = [...CHARACTERS_MAP.keys()].filter((id) => !excludedIds.includes(id));

    if (poolIds.length < 2) {
      throw new TooSmallCharacterPool();
    }

    const combos = combinations(poolIds, 2);
    shuffleArray(combos);

    poolIds.forEach((id) => {
      scores.value[id] = 0;
    });

    queueIDs.value = QueueIDsEntrySchema.array().parse(combos);
    _screen.value = "progress";
  }

  function reset() {
    queueIDs.value = [];
    choices.value = [];
    scores.value = {};
    _screen.value = "start";
  }

  return {
    queueIDs,
    choices,
    scores,
    currentIdPair,
    currentPair,
    screen,
    choose,
    skip,
    undo,
    start,
    reset,
  };
});
