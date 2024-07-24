<script setup lang="ts">
import CharacterCard from "@/components/CharacterCard.vue";
import Main from "@/components/Main.vue";
import Dialog from "@/components/Dialog.vue";
import H1 from "@/components/typography/H1.vue";
import H2 from "@/components/typography/H2.vue";
import P from "@/components/typography/P.vue";
import Button from "@/components/ui/Button.vue";
import type { StarRailCharacter } from "@/data/characters";
import { useFullModeStore } from "@/stores/full-compare";
import { useThrottleFn } from "@vueuse/core";
import { computed, ref } from "vue";

const fullMode = useFullModeStore();
const modalOpen = ref<boolean>(false);

const canUndo = computed(() => fullMode.choices.length > 0);

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
  modalOpen.value = true;
};

const reset = () => {
  modalOpen.value = false;
  fullMode.reset();
};
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
  </Main>

  <Dialog v-model="modalOpen">
    <H2 class="font-bold">Are you sure?</H2>
    <P>
      You are about to completely reset current comparison progress!
      <br />
      This means, you will not be able to revert this action!
    </P>
    <div class="mt-4 flex flex-row gap-2 self-end">
      <Button size="sm" @click="modalOpen = false">Cancel</Button>
      <Button size="sm" variant="destructive" @click="reset">Confirm</Button>
    </div>
  </Dialog>
</template>
