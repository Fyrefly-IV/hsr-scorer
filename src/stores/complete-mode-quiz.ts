import { CHARACTERS, type Character } from "@/data/characters";
import { combinations, shuffleArray } from "$lib/arrays";
import { excludedCharacterIds } from "./characters";
import { get, writable } from "svelte/store";

type ScoreEntry = {
  characterId: Character["id"];
  value: number;
};

type HistoryEntry = {
  createdAt: number;
  pair: [Character["id"], Character["id"]];
  winnerId: Character["id"];
};

type CompleteModeState = {
  started: boolean;
  queue: Character["id"][][];
  scores: { [key: Character["id"]]: ScoreEntry };
  choiceHistory: HistoryEntry[];
};

const createEmptyState = (): CompleteModeState => ({
  started: false,
  queue: [],
  scores: {},
  choiceHistory: [],
});

const createState = (): CompleteModeState => {
  console.debug("creating state for complete mode");

  const scores: CompleteModeState["scores"] = {};

  for (const ch of CHARACTERS) {
    if (get(excludedCharacterIds).includes(ch.id)) {
      continue;
    }

    scores[ch.id] = {
      characterId: ch.id,
      value: 0,
    };
  }

  const queue = combinations(
    Object.values(scores).map((entry) => entry.characterId),
    2,
  );

  shuffleArray(queue);

  return { queue, scores, choiceHistory: [], started: true };
};

export function createCompleteModeQuiz() {
  const { set, update, subscribe } = writable<CompleteModeState>(createEmptyState());

  const create = () => {
    set(createState());
  };

  const reset = () => {
    set(createEmptyState());
  };

  const choose = (winnerId: Character["id"]) =>
    update((oldState) => {
      if (!(winnerId in oldState.scores)) {
        return oldState;
      }

      if (oldState.queue.length === 0) {
        return oldState;
      }

      const now = new Date();

      const newState = { ...oldState };
      const lastPair = newState.queue.pop()!;

      newState.scores[winnerId].value++;

      newState.choiceHistory.push({
        createdAt: now.getTime(),
        pair: lastPair as [string, string],
        winnerId,
      });

      return newState;
    });

  const undo = () => {
    update((oldState) => {
      if (oldState.choiceHistory.length === 0) {
        return oldState;
      }

      const newState = { ...oldState };
      const historyEntry = newState.choiceHistory.pop()!;

      newState.scores[historyEntry.winnerId].value--;
      newState.queue.push(historyEntry.pair);

      return newState;
    });
  };

  return {
    subscribe,
    set,
    create,
    reset,
    choose,
    undo,
  } as const;
}

export const completeModeQuiz = createCompleteModeQuiz();
