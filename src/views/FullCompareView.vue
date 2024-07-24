<script setup lang="ts">
import CharacterCard from "@/components/CharacterCard.vue";
import Main from "@/components/Main.vue";
import H1 from "@/components/typography/H1.vue";
import P from "@/components/typography/P.vue";
import Button from "@/components/ui/Button.vue";
import type { StarRailCharacter } from "@/data/characters";
import { useFullModeStore } from "@/stores/full-compare";
import { useThrottleFn } from "@vueuse/core";

const fullMode = useFullModeStore();

const start = () => {
  fullMode.start();
};

const pick = useThrottleFn((winnerId: StarRailCharacter["id"]) => {
  fullMode.choose(winnerId);
}, 200);
</script>

<template>
  <Main class="flex items-center justify-center">
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
        <Button variant="secondary">Undo</Button>
        <Button variant="secondary">Skip</Button>
        <Button variant="secondary">Stop</Button>
      </div>
    </div>
  </Main>
</template>
