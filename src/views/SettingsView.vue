<script setup lang="ts">
import CharacterCard from "@/components/CharacterCard.vue";
import Main from "@/components/Main.vue";
import H1 from "@/components/typography/H1.vue";
import P from "@/components/typography/P.vue";
import Alert from "@/components/ui/alert/Alert.vue";
import AlertDescription from "@/components/ui/alert/AlertDescription.vue";
import AlertTitle from "@/components/ui/alert/AlertTitle.vue";
import Button from "@/components/ui/Button.vue";
import { STAR_RAIL_CHARACTERS } from "@/data/star-rail";
import type { Character } from "@/data/schemas";
import { useFullModeStore } from "@/stores/full-compare";
import { useSettingsStore } from "@/stores/settings";
import { TriangleAlertIcon, XIcon } from "lucide-vue-next";
import Input from "@/components/ui/Input.vue";
import { computed, ref } from "vue";
import { refDebounced } from "@vueuse/core";

const settings = useSettingsStore();
const fullMode = useFullModeStore();

const characterClickHandler = (id: Character["id"]) => {
  if (!settings.isExcludedId(id)) {
    settings.excludeIds(id);
  } else {
    settings.includeIds(id);
  }
};

const hsrSearchValue = ref<string>("");
const hsrSearchDebounced = refDebounced(hsrSearchValue, 200);

const shownHsrCharacters = computed(() => {
  if (hsrSearchDebounced.value.length === 0) {
    return STAR_RAIL_CHARACTERS;
  }

  return STAR_RAIL_CHARACTERS.filter((c) =>
    c.name.toLowerCase().includes(hsrSearchDebounced.value.toLowerCase()),
  );
});

const handleStarRailIncludeAll = () => {
  settings.includeIds(...STAR_RAIL_CHARACTERS.map((c) => c.id));
};

const handleStarRailExcludeAll = () => {
  settings.excludeIds(...STAR_RAIL_CHARACTERS.map((c) => c.id));
};
</script>

<template>
  <Main class="flex flex-col">
    <div class="font-anuphan container mt-10">
      <H1>Settings</H1>
      <P class="text-lg">
        In settings you can pick characters which you want to be present in your comparisons by
        simply clicking on them!
      </P>

      <Alert v-if="fullMode.screen === 'progress'" variant="destructive" class="mt-4">
        <AlertTitle class="flex flex-row items-center gap-2">
          <TriangleAlertIcon class="inline size-6" />
          <span>WARNING!</span>
        </AlertTitle>
        <AlertDescription>
          You are currently in progress of comparing characters, if you select or deselect
          characters right now these changes will take effect only once you start comparing again!
        </AlertDescription>
      </Alert>
    </div>

    <div class="container mt-10">
      <div>
        <H1>Star Rail</H1>
        <div class="mt-4 grid grid-cols-2 flex-row gap-2 md:flex">
          <Button variant="secondary" @click="handleStarRailIncludeAll">Select All</Button>
          <Button variant="secondary" @click="handleStarRailExcludeAll">Deselect All</Button>
        </div>
        <div class="mt-4 flex gap-2">
          <Button size="icon" variant="secondary" class="size-10" @click="hsrSearchValue = ''">
            <XIcon />
          </Button>
          <Input v-model="hsrSearchValue" />
        </div>
      </div>
      <div
        class="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        <CharacterCard
          v-for="c in shownHsrCharacters"
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
