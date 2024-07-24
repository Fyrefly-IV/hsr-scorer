import { StarRailCharacterSchema, type StarRailCharacter } from "@/data/characters";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";
import { z } from "zod";
import { useSettingsStore } from "./settings";
import { combinations, shuffleArray } from "@/lib/arrays";
import { getObjectValue } from "@/lib/get-object-value";

const QueueEntrySchema = z.tuple([StarRailCharacterSchema, StarRailCharacterSchema]);
const ChoiceEntrySchema = z.object({
  pair: QueueEntrySchema,
  winnerId: StarRailCharacterSchema.shape.id,
});
const ScreenStateSchema = z.union([
  z.literal("start"),
  z.literal("progress"),
  z.literal("results"),
]);

type QueueEntry = z.infer<typeof QueueEntrySchema>;
type ChoiceEntry = z.infer<typeof ChoiceEntrySchema>;
type ScreenState = z.infer<typeof ScreenStateSchema>;
type Scores = { [Key in StarRailCharacter["id"]]: number };

export const useFullModeStore = defineStore("full-mode", () => {
  const queue = useLocalStorage<QueueEntry[]>("queue", []);
  const choices = useLocalStorage<ChoiceEntry[]>("choices", []);
  const scores = useLocalStorage<Scores>("scores", {});

  const _screen = useLocalStorage<ScreenState>("screen", "start");
  const screen = computed(() => _screen.value);

  const currentPair = computed(() => {
    if (queue.value.length === 0) {
      return null;
    }

    return queue.value[0];
  });

  function choose(winnerId: StarRailCharacter["id"], autoFinish: boolean = true) {
    const pair = currentPair.value;
    if (pair == null) {
      throw Error("there is no current pair, cannot make a choice!");
    }

    if (!pair.some((c) => c.id === winnerId)) {
      throw Error(`provided winnerId is not present in current pair ${pair}`);
    }

    scores.value[winnerId] = (getObjectValue(scores.value, winnerId) ?? 0) + 1;
    choices.value = [{ pair, winnerId }, ...choices.value];
    queue.value = queue.value.slice(1);

    if (autoFinish === true && queue.value.length === 0) {
      _screen.value = "results";
    }
  }

  function undo() {
    if (choices.value.length === 0) {
      throw Error("there are no choices entries, cannot undo");
    }

    const latestChoice = choices.value[0];

    choices.value = choices.value.slice(1);
    queue.value = [latestChoice.pair, ...queue.value];

    const score = getObjectValue(scores.value, latestChoice.winnerId);
    if (score != null) {
      scores.value[latestChoice.winnerId] = score - 1;
    }
  }

  function start() {
    const pool = [...useSettingsStore().characterPool];

    if (pool.length === 0) {
      throw Error("character pool is empty");
    }

    const combos = combinations(pool, 2);
    shuffleArray(combos);

    pool.forEach((c) => {
      scores.value[c.id] = 0;
    });

    queue.value = QueueEntrySchema.array().parse(combos);
    _screen.value = "progress";
  }

  function reset() {
    queue.value = []
    choices.value = []
    scores.value = {}
    _screen.value = "start";
  }

  return {
    queue,
    choices,
    scores,
    currentPair,
    screen,
    choose,
    undo,
    start,
    reset,
  };
});
