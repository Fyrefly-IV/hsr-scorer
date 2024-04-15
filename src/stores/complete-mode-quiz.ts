import { CHARACTERS, CharacterSchema, type Character } from "@/data/characters";
import { combinations, shuffleArray } from "$lib/arrays";
import { excludedCharacterIds } from "./characters";
import { get, writable } from "svelte/store";
import { z } from "zod";
import { browser } from "$app/environment";

const STORAGE_KEY = "hsr-scorer-complete-mode-quiz";

const ScoreEntrySchema = z.object({
  characterId: CharacterSchema.shape.id,
  value: z.number(),
});

const HistoryEntrySchema = z.object({
  createdAt: z.number().positive(),
  pair: z.tuple([CharacterSchema.shape.id, CharacterSchema.shape.id]),
  winnerId: CharacterSchema.shape.id,
});

const StateSchema = z.object({
  started: z.boolean(),
  queue: z.tuple([CharacterSchema.shape.id, CharacterSchema.shape.id]).array(),
  scores: z.record(CharacterSchema.shape.id, ScoreEntrySchema),
  choiceHistory: HistoryEntrySchema.array(),
});

type Store = z.infer<typeof StateSchema>;

const createEmptyState = (): Store => ({
  started: false,
  queue: [],
  scores: {},
  choiceHistory: [],
});

const createState = (): Store => {
  console.debug("[COMPLETE MODE STORE] creating state for complete mode");
  const scores: Store["scores"] = {};

  for (const ch of CHARACTERS) {
    if (get(excludedCharacterIds).includes(ch.id)) {
      continue;
    }

    scores[ch.id] = {
      characterId: ch.id,
      value: 0,
    };
  }

  const poolIds = Object.values(scores).map((entry) => entry.characterId);
  const queue = combinations(poolIds, 2) as [Character["id"], Character["id"]][];

  shuffleArray(queue);

  return { queue, scores, choiceHistory: [], started: true };
};

const createInitialState = (): Store => {
  if (browser) {
    const maybeSavedData = localStorage.getItem(STORAGE_KEY);

    if (maybeSavedData != null) {
      const maybeJson = JSON.parse(maybeSavedData);
      console.debug("[COMPLETE MODE STORE] detected saved complete mode state, parsing...");
      const parseResult = StateSchema.safeParse(maybeJson);
      if (parseResult.success) {
        console.debug("[COMPLETE MODE STORE] saved state parsed and returned");
        return parseResult.data;
      } else {
        console.error(parseResult.error);
      }
    }
  }

  return createEmptyState();
};

export function createCompleteModeQuiz() {
  const { set, update, subscribe } = writable<Store>(createInitialState());

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

completeModeQuiz.subscribe((store) => {
  if (browser) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
});
