<script setup lang="ts">
import CharacterCard from "@/components/CharacterCard.vue";
import Main from "@/components/Main.vue";
import Dialog from "@/components/Dialog.vue";
import H1 from "@/components/typography/H1.vue";
import H2 from "@/components/typography/H2.vue";
import P from "@/components/typography/P.vue";
import Button from "@/components/ui/Button.vue";
import { getCharacterById } from "@/data/characters";
import { TooSmallCharacterPool, useFullModeStore } from "@/stores/full-compare";
import { useThrottleFn } from "@vueuse/core";
import { computed, ref } from "vue";
import { UndoIcon, SkipForwardIcon, XIcon } from "lucide-vue-next";
import type { Character } from "@/data/schemas";

const fullMode = useFullModeStore();

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
  <Main class="flex min-h-screen flex-col items-center justify-center bg-background pt-16 sm:pt-0">
    <div v-if="fullMode.screen === 'start'" class="flex max-w-[800px] flex-col">
      <H1 class="text-center">Full Compare</H1>
      <P class="text-justify">
        In this mode you will be comparing characters that can select in the settings (or have
        selected them already). This comparison might take a while, so make sure you have excluded
        characters that you don't want to be present in the comparison process, as it might take a
        while! Also, don't worry, the progress will not reset if you close the window or your
        browser as it's all being stored in your browser's local storage.
      </P>

      <button
        @click="start"
        class="mt-8 h-9 w-fit self-center rounded-md bg-neutral-200 px-4 text-sm font-bold text-neutral-800 duration-100 hover:bg-neutral-400"
      >
        Start Comparing
      </button>
    </div>

    <div v-if="fullMode.screen === 'progress'" class="w-ful w-fit max-w-[600px]">
      <div
        class="grid w-fit grid-cols-1 place-items-center gap-4 sm:grid-cols-2"
        v-if="fullMode.currentPair != null"
      >
        <CharacterCard
          v-for="ch in fullMode.currentPair"
          :key="`pair-${ch.id}`"
          @click="() => chooseThrottled(ch.id)"
          :character="ch"
          class="max-w-[270px] cursor-pointer select-none sm:max-w-none"
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
