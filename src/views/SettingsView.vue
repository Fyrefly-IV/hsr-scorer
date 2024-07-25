<script setup lang="ts">
import CharacterCard from "@/components/CharacterCard.vue";
import Main from "@/components/Main.vue";
import H1 from "@/components/typography/H1.vue";
import P from "@/components/typography/P.vue";
import Button from "@/components/ui/Button.vue";
import { CHARACTERS, type StarRailCharacter } from "@/data/characters";
import { useSettingsStore } from "@/stores/settings";

const settings = useSettingsStore();

const characterClickHandler = (id: StarRailCharacter["id"]) => {
  if (!settings.isExcludedId(id)) {
    settings.excludeIds(id);
  } else {
    settings.includeIds(id);
  }
};

const handleStarRailIncludeAll = () => {
  settings.includeIds(...CHARACTERS.map((c) => c.id));
};

const handleStarRailExcludeAll = () => {
  settings.excludeIds(...CHARACTERS.map((c) => c.id));
};
</script>

<template>
  <Main class="flex flex-col">
    <div class="container mt-10 font-anuphan">
      <H1>Settings</H1>
      <P class="text-lg">
        In settings you can pick characters which you want to be present in your comparisons by
        simply clicking on them!
      </P>
    </div>

    <div class="container mt-10">
      <div>
        <H1>Star Rail</H1>
        <div class="mt-4 flex flex-row gap-2">
          <Button @click="handleStarRailIncludeAll">Select All</Button>
          <Button @click="handleStarRailExcludeAll">Deselect All</Button>
        </div>
      </div>
      <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
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
    </div>
  </Main>
</template>
