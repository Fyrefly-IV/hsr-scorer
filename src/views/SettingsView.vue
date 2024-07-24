<script setup lang="ts">
import CharacterCard from "@/components/CharacterCard.vue";
import Main from "@/components/Main.vue";
import { CHARACTERS, type Character } from "@/data/characters";
import { useSettingsStore } from "@/stores/settings";

const settings = useSettingsStore();

const characterClickHandler = (id: Character["id"]) => {
  if (!settings.isExcludedId(id)) {
    settings.excludeId(id);
  } else {
    settings.includeId(id);
  }
};
</script>

<template>
  <Main class="flex flex-col">
    <div class="font-anuphan container mt-10">
      <h1 class="text-2xl md:text-4xl font-bold">Settings</h1>
      <p class="text-lg">
        In settings you can pick characters which you want to be present in your comparisons by
        simply clicking on them!
      </p>
    </div>

    <div class="container mt-8 flex flex-row flex-wrap justify-evenly gap-8">
      <CharacterCard
        v-for="c in CHARACTERS"
        :key="c.id"
        :character="c"
        @click="() => characterClickHandler(c.id)"
        class="cursor-pointer"
        :excluded="settings.isExcludedId(c.id)"
        hoverable
      />
    </div>
  </Main>
</template>
