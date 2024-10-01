<script setup lang="ts">
import { computed, ref } from "vue";
import { useGameStore } from "@/features/game/model/game";
import { getCharacterById } from "@/entities/character/data/characters";
import type { Character } from "@/entities/character/model/types";
import CharacterCard from "@/entities/character/ui/CharacterCard.vue";
import Button from "@/shared/ui/button/Button.vue";
import H2 from "@/shared/ui/typography/H2.vue";

const emit = defineEmits(["confirmReset"]);

const fullMode = useGameStore();

const showScores = ref<boolean>(false);

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
</script>

<template>
  <div class="flex w-full flex-col items-center">
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

      <Button variant="outline" class="w-fit self-center" @click="emit('confirmReset')">
        Reset
      </Button>

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
</template>
