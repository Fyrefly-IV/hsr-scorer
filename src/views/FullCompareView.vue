<script setup lang="ts">
import CharacterCard from "@/components/CharacterCard.vue";
import Main from "@/components/Main.vue";
import Dialog from "@/components/Dialog.vue";
import H1 from "@/components/typography/H1.vue";
import H2 from "@/components/typography/H2.vue";
import P from "@/components/typography/P.vue";
import Button from "@/components/ui/Button.vue";
import { characterById, type StarRailCharacter } from "@/data/characters";
import { useFullModeStore } from "@/stores/full-compare";
import { useThrottleFn } from "@vueuse/core";
import { computed, ref } from "vue";

const fullMode = useFullModeStore();
const showModal = ref<boolean>(false);
const showScores = ref<boolean>(false);

const canUndo = computed(() => fullMode.choices.length > 0);

const scores = computed(() => {
  const scoresSorted = Object.entries(fullMode.scores);
  scoresSorted.sort((a, b) => b[1] - a[1]);

  const scoresWithCharacters = scoresSorted.map(([id, score]) => {
    const character = characterById(id);
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

const start = () => {
  fullMode.start();
};

const pick = useThrottleFn((winnerId: StarRailCharacter["id"]) => {
  fullMode.choose(winnerId);
}, 200);

const undo = () => {
  if (canUndo.value) {
    fullMode.undo();
  }
};

const confirmReset = () => {
  showModal.value = true;
};

const reset = () => {
  showModal.value = false;
  showScores.value = false;
  fullMode.reset();
};
</script>

<template>
  <Main class="flex w-full items-center justify-center py-14">
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

    <div v-if="fullMode.screen === 'progress'" class="flex max-w-[800px] flex-col">
      <div class="mb-2 grid grid-cols-[1fr_auto_1fr] grid-rows-1 items-center gap-2">
        <div class="h-1 bg-gradient-to-r from-transparent to-neutral-700"></div>
        <span class="text-sm text-neutral-500">{{ fullMode.queue.length }} pairs left</span>
        <div class="h-1 bg-gradient-to-l from-transparent to-neutral-700"></div>
      </div>
      <div v-if="fullMode.currentPair != null" class="flex flex-col gap-6 md:flex-row">
        <CharacterCard
          v-for="ch in fullMode.currentPair"
          :key="ch.id"
          :character="ch"
          @click="() => pick(ch.id)"
          class="cursor-pointer"
          hoverable
        />
      </div>
      <div class="auto mt-4 grid w-full grid-flow-dense grid-cols-1 gap-2 gap-x-4 md:grid-cols-3">
        <Button variant="secondary" @click="undo" :disabled="!canUndo">Undo</Button>
        <Button variant="secondary" disabled>Skip</Button>
        <Button variant="secondary" @click="confirmReset">Stop</Button>
      </div>
    </div>

    <div v-if="fullMode.screen === 'results'" class="flex w-full flex-col items-center">
      <div class="flex max-w-[800px] flex-col">
        <H2 class="mb-4 text-center font-bold">
          Most chosen character<span v-if="winners.length > 1">s</span>
        </H2>
        <div class="mb-4 flex flex-row flex-wrap justify-center">
          <CharacterCard
            v-for="(entry, i) in winners"
            :key="`winner-${i}`"
            :character="entry.character"
            class="w-[250px]"
          />
        </div>

        <Button variant="secondary" @click="confirmReset" class="w-fit self-center">Reset</Button>

        <button
          class="mt-6 w-fit self-center rounded-md px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-700 hover:text-neutral-400"
          @click="showScores = !showScores"
        >
          Click to view scores
        </button>
      </div>

      <div
        v-if="showScores"
        class="container mt-8 flex w-full flex-shrink-0 flex-row flex-wrap justify-center gap-8"
      >
        <div v-for="(entry, i) in scores" :key="`scores-${i}`" class="flex flex-col">
          <span class="mb-2 self-center text-sm font-semibold">{{ entry.score }} points</span>
          <CharacterCard
            :character="entry.character"
            class="w-[150px] [&_div:has(h4)]:mb-2 [&_h4]:text-lg"
          />
        </div>
      </div>
    </div>
  </Main>

  <Dialog v-model="showModal">
    <H2 class="font-bold">Are you sure?</H2>
    <P>
      You are about to completely reset current comparison progress!
      <br />
      This means, you will not be able to revert this action!
    </P>
    <div class="mt-4 flex flex-row gap-2 self-end">
      <Button size="sm" @click="showModal = false">Cancel</Button>
      <Button size="sm" variant="destructive" @click="reset">Confirm</Button>
    </div>
  </Dialog>
</template>
