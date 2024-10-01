<script setup lang="ts">
import { useThrottleFn } from "@vueuse/core";
import { SkipForwardIcon, UndoIcon, XIcon } from "lucide-vue-next";
import { computed } from "vue";
import { useGameStore } from "@/features/game/model/game";
import { useCharacterCardsOptions } from "@/entities/character/model/stores";
import type { Character } from "@/entities/character/model/types";
import CharacterCard from "@/entities/character/ui/CharacterCard.vue";
import Button from "@/shared/ui/button/Button.vue";

const emit = defineEmits(["confirmReset"]);

const fullMode = useGameStore();
const cardOptions = useCharacterCardsOptions();

const canUndo = computed(() => fullMode.choices.length > 0);

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
</script>

<template>
  <div class="w-ful w-fit max-w-[600px]">
    <div
      v-if="fullMode.currentPair != null"
      class="grid w-fit grid-cols-[minmax(0,250px)] place-items-center gap-4 sm:grid-cols-[repeat(2,minmax(0,250px))]"
    >
      <CharacterCard
        v-for="ch in fullMode.currentPair"
        :key="`pair-${ch.id}`"
        class="w-full cursor-pointer select-none"
        :show-path="cardOptions.showPaths"
        :show-type="cardOptions.showTypes"
        :character="ch"
        hoverable
        @click="() => chooseThrottled(ch.id)"
      />
    </div>
    <div class="mt-6 flex w-full items-center justify-between">
      <Button variant="ghost" size="icon" :disabled="!canUndo" @click="undo">
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
        <Button variant="destructive" size="icon" @click="emit('confirmReset')">
          <XIcon class="size-6" />
          <span class="sr-only">Stop Comparing</span>
        </Button>
      </div>
    </div>
  </div>
</template>
