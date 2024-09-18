<script setup lang="ts">
import { useThrottleFn } from "@vueuse/core";
import { UndoIcon, SkipForwardIcon, XIcon, PlayIcon } from "lucide-vue-next";
import { computed, ref } from "vue";
import { TooSmallCharacterPool, useGameStore } from "@/features/game/model/game";
import { getCharacterById } from "@/entities/character/data/characters";
import { useCharacterCardsOptions } from "@/entities/character/model/stores";
import type { Character } from "@/entities/character/model/types";
import CharacterCard from "@/entities/character/ui/CharacterCard.vue";
import Button from "@/shared/ui/button/Button.vue";
import Dialog from "@/shared/ui/dialog/Dialog.vue";
import Main from "@/shared/ui/main/Main.vue";
import H1 from "@/shared/ui/typography/H1.vue";
import H2 from "@/shared/ui/typography/H2.vue";
import P from "@/shared/ui/typography/P.vue";

const fullMode = useGameStore();
const cardOptions = useCharacterCardsOptions();

const showModalResetWarning = ref<boolean>(false);
const showModalSmallPool = ref<boolean>(false);
const showScores = ref<boolean>(false);

const canUndo = computed(() => fullMode.choices.length > 0);

const scores = computed(() => {
  const scoresSorted = Object.entries(fullMode.scores);
  scoresSorted.sort((a, b) => b[1] - a[1]);

  const scoresWithCharacters = scoresSorted.map(([id, score]) => {
    const character = getCharacterById(id);
    if (character == null) {
      throw TypeError("character with score was not found");
    }

    return { score, character };
  });

  return scoresWithCharacters;
});

const winners = computed(() => {
  if (scores.value.length === 0) {
    return [];
  }

  const bestScore = scores.value[0].score;
  return scores.value.filter((entry) => entry.score === bestScore);
});

const isWinnerId = (id: Character["id"]): boolean => {
  return winners.value.some((winner) => winner.character.id === id);
};

const start = () => {
  try {
    fullMode.start();
  } catch (err) {
    if (err instanceof TooSmallCharacterPool) {
      showModalSmallPool.value = true;
    }
  }
};

const chooseThrottled = useThrottleFn((winnerId: Character["id"]) => {
  fullMode.choose(winnerId);
}, 200);

const skipThrottled = useThrottleFn(() => {
  fullMode.skip();
}, 200);

const undo = () => {
  if (canUndo.value) {
    fullMode.undo();
  }
};

const confirmReset = () => {
  showModalResetWarning.value = true;
};

const reset = () => {
  showModalResetWarning.value = false;
  showScores.value = false;
  fullMode.reset();
};
</script>

<template>
  <Main class="flex flex-col items-center justify-center bg-background pt-4 sm:pt-0">
    <div v-if="fullMode.screen === 'start'" class="flex max-w-[800px] flex-col">
      <H1 class="text-center">Full Compare</H1>
      <P class="text-center">
        In this mode, you will be comparing characters that you can choose from a list in the
        settings. The process may take a significant amount of time, so we recommend ensuring that
        you exclude any characters from the list that you do not wish to compare.
      </P>

      <Button @click="start" class="mt-4 w-fit gap-2 self-center">
        <PlayIcon class="w-4" />
        <span>Start Comparing</span>
      </Button>

      <P class="text-center">
        You don't need to worry about the progress of the comparison; if you haven't disabled
        cookies or are not using incognito mode in your browser, each step is saved in the browser
        itself, and you will be able to return to this page to continue the process!
      </P>
    </div>

    <div v-if="fullMode.screen === 'progress'" class="w-ful w-fit max-w-[600px]">
      <div
        class="grid w-fit grid-cols-[minmax(0,250px)] place-items-center gap-4 sm:grid-cols-[repeat(2,minmax(0,250px))]"
        v-if="fullMode.currentPair != null"
      >
        <CharacterCard
          v-for="ch in fullMode.currentPair"
          :key="`pair-${ch.id}`"
          class="w-full cursor-pointer select-none"
          @click="() => chooseThrottled(ch.id)"
          :show-path="cardOptions.showPaths"
          :show-type="cardOptions.showTypes"
          :character="ch"
          hoverable
        />
      </div>
      <div class="mt-6 flex w-full items-center justify-between">
        <Button variant="ghost" size="icon" @click="undo" :disabled="!canUndo">
          <UndoIcon class="size-6" />
          <span class="sr-only">Undo</span>
        </Button>

        <span class="text-sm text-muted-foreground sm:text-base">
          <span>{{ fullMode.queueIDs.length }}</span>
          <span class="hidden sm:inline"> pairs</span>
          <span> left</span>
        </span>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" @click="skipThrottled">
            <SkipForwardIcon class="size-6" />
            <span className="sr-only">Skip</span>
          </Button>
          <Button variant="destructive" size="icon" @click="confirmReset">
            <XIcon class="size-6" />
            <span class="sr-only">Stop Comparing</span>
          </Button>
        </div>
      </div>
    </div>

    <div v-if="fullMode.screen === 'results'" class="flex w-full flex-col items-center">
      <div class="flex max-w-[800px] flex-col">
        <H2 class="mb-4 text-center font-bold">
          Most chosen character<span v-if="winners.length > 1">s</span>
        </H2>
        <div class="mb-4 flex flex-row flex-wrap justify-center gap-2">
          <CharacterCard
            v-for="(entry, i) in winners"
            :key="`winner-${i}`"
            :character="entry.character"
            class="w-[250px]"
            decoration
          />
        </div>

        <Button variant="outline" @click="confirmReset" class="w-fit self-center">Reset</Button>

        <button
          class="mt-6 w-fit self-center rounded-md px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-700 hover:text-neutral-400"
          @click="showScores = !showScores"
        >
          Click to view scores
        </button>
      </div>

      <div
        v-if="showScores"
        class="container mt-8 flex w-full flex-shrink-0 flex-row flex-wrap justify-center gap-8 px-0"
      >
        <CharacterCard
          v-for="(entry, i) in scores"
          :key="`scores-${i}`"
          :character="entry.character"
          :text-under-name="`${entry.score} points`"
          class="w-[150px] md:w-[170px] [&_h3]:text-base [&_p]:text-xs"
          :decoration="isWinnerId(entry.character.id)"
        />
      </div>
    </div>
  </Main>

  <Dialog v-model="showModalResetWarning">
    <H2 class="font-bold">Are you sure?</H2>
    <P>
      You are about to completely reset current comparison progress!
      <br />
      This means, you will not be able to revert this action!
    </P>
    <div class="mt-4 flex flex-row gap-2 self-end">
      <Button size="sm" @click="showModalResetWarning = false">Cancel</Button>
      <Button size="sm" variant="destructive" @click="reset">Confirm</Button>
    </div>
  </Dialog>

  <Dialog v-model="showModalSmallPool">
    <H2 class="font-bold">Chracter pool is too small!</H2>
    <P>
      Looks like your character pool doesn't contain <strong>at least two characters!</strong>
      Head over to settings and select some of the to continue.
    </P>
    <div class="flwx-row mt-4 flex gap-2 self-end">
      <Button size="sm" @click="showModalSmallPool = false">Ok</Button>
    </div>
  </Dialog>
</template>
