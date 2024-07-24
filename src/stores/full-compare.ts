import { CharacterSchema, type Character } from "@/data/characters";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";
import { z } from "zod";
import { useSettingsStore } from "./settings";
import { combinations, shuffleArray } from "@/lib/arrays";

const QueueEntrySchema = z.tuple([CharacterSchema, CharacterSchema]);
const ChoiceEntrySchema = z.object({
  pair: QueueEntrySchema,
  winnerId: CharacterSchema.shape.id,
});

type QueueEntry = z.infer<typeof QueueEntrySchema>;
type ChoiceEntry = z.infer<typeof ChoiceEntrySchema>;
type Scores = { [Key in Character["id"]]?: number };

export const useFullModeStore = defineStore("full-mode", () => {
  const queue = useLocalStorage<QueueEntry[]>("queue", []);
  const choices = useLocalStorage<ChoiceEntry[]>("choices", []);
  const scores = useLocalStorage<Scores>("scores", {});

  const isStarted = useLocalStorage<boolean>("is-started", false);
  const isFinished = useLocalStorage<boolean>("is-finished", false);

  const currentPair = computed(() => {
    if (queue.value.length === 0) {
      return null;
    }

    return queue.value[0];
  });

  function choose(winnerId: Character["id"]) {
    const pair = currentPair.value;
    if (pair == null) {
      throw Error("there is no current pair, cannot make a choice!");
    }

    if (!pair.some((c) => c.id === winnerId)) {
      throw Error(`provided winnerId is not present in current pair ${pair}`);
    }

    scores.value[winnerId] = (scores.value[winnerId] ?? 0) + 1;
    choices.value = [{ pair, winnerId }, ...choices.value];
    queue.value = queue.value.slice(1);
  }

  function undo() {
    if (choices.value.length === 0) {
      throw Error("there are no choices entries, cannot undo");
    }

    const latestChoice = choices.value[0];

    choices.value = choices.value.slice(1);
    queue.value = [latestChoice.pair, ...queue.value];

    const score = scores.value[latestChoice.winnerId];
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

    isStarted.value = true;
  }

  return { queue, choices, scores, isStarted, isFinished, currentPair, choose, undo, start };
});
