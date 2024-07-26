import { CHARACTERS_MAP, CharacterSchema } from "@/data/characters";
import type { Character } from "@/data/characters";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";
import { z } from "zod";
import { useSettingsStore } from "./settings";
import { combinations, shuffleArray } from "@/lib/arrays";
import { getObjectValue } from "@/lib/get-object-value";

const QueueIDsEntrySchema = z.tuple([CharacterSchema.shape.id, CharacterSchema.shape.id]);
const ChoiceEntrySchema = z.object({
  pair: QueueIDsEntrySchema,
  winnerId: CharacterSchema.shape.id.nullable(),
});
const ScreenStateSchema = z.union([
  z.literal("start"),
  z.literal("progress"),
  z.literal("results"),
]);

type QueueIDsEntry = z.infer<typeof QueueIDsEntrySchema>;
type ChoiceEntry = z.infer<typeof ChoiceEntrySchema>;
type ScreenState = z.infer<typeof ScreenStateSchema>;
type Scores = { [Key in Character["id"]]: number };

export const useFullModeStore = defineStore("full-mode", () => {
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

  const currentPair = computed<[Character, Character] | null>(() => {
    if (queueIDs.value.length === 0) {
      return null;
    }

    const [a, b] = queueIDs.value[0];

    const characterA = CHARACTERS_MAP.get(a);
    const characterB = CHARACTERS_MAP.get(b);

    if (characterA == null || characterB == null) {
      return null;
    }

    return [characterA, characterB];
  });

  function choose(winnerId: Character["id"], autoFinish: boolean = true) {
    const pair = currentIdPair.value;
    if (pair == null) {
      throw Error("there is no current pair, cannot make a choice!");
    }

    if (!pair.some((id) => id === winnerId)) {
      throw Error(`provided winnerId is not present in current pair ${pair}`);
    }

    scores.value[winnerId] = (getObjectValue(scores.value, winnerId) ?? 0) + 1;
    choices.value = [{ pair, winnerId }, ...choices.value];
    queueIDs.value = queueIDs.value.slice(1);

    if (autoFinish === true && queueIDs.value.length === 0) {
      _screen.value = "results";
    }
  }

  function undo() {
    if (choices.value.length === 0) {
      throw Error("there are no choices entries, cannot undo");
    }

    const latestChoice = choices.value[0];

    choices.value = choices.value.slice(1);
    queueIDs.value = [latestChoice.pair, ...queueIDs.value];

    if (latestChoice.winnerId == null) {
      return;
    }

    const score = getObjectValue(scores.value, latestChoice.winnerId);
    if (score != null) {
      scores.value[latestChoice.winnerId] = score - 1;
    }
  }

  function start() {
    const settings = useSettingsStore();
    const excludedIds = settings.excludedIds;

    const poolIds = [...CHARACTERS_MAP.keys()].filter((id) => !excludedIds.includes(id));

    if (poolIds.length === 0) {
      throw Error("character pool is empty");
    }

    const combos = combinations(poolIds, 2);
    shuffleArray(combos);

    poolIds.forEach((id) => {
      scores.value[id] = 0;
    });

    console.log(combos);

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
    undo,
    start,
    reset,
  };
});
