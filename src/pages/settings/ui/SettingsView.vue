<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { refDebounced } from "@vueuse/core";
import { TriangleAlertIcon, XIcon } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useGameStore } from "@/features/game/model/game";
import { CHARACTER_PATHS, CHARACTER_TYPES } from "@/entities/character/config/constants";
import { STAR_RAIL_CHARACTERS } from "@/entities/character/data/star-rail";
import { useCharacterCardsOptions, useExcludedCharacters } from "@/entities/character/model/stores";
import type { Character, StarRailPaths, StarRailTypes } from "@/entities/character/model/types";
import CharacterCard from "@/entities/character/ui/CharacterCard.vue";
import { cn } from "@/shared/lib/cn";
import Alert from "@/shared/ui/alert/Alert.vue";
import AlertDescription from "@/shared/ui/alert/AlertDescription.vue";
import AlertTitle from "@/shared/ui/alert/AlertTitle.vue";
import Button from "@/shared/ui/button/Button.vue";
import Input from "@/shared/ui/input/Input.vue";
import Main from "@/shared/ui/main/Main.vue";
import Switch from "@/shared/ui/switch/Switch.vue";
import H1 from "@/shared/ui/typography/H1.vue";
import P from "@/shared/ui/typography/P.vue";

const settings = useExcludedCharacters();
const cardOptions = useCharacterCardsOptions();
const fullMode = useGameStore();

const characterClickHandler = (id: Character["id"]) => {
  if (!settings.isExcludedId(id)) {
    settings.excludeIds(id);
  } else {
    settings.includeIds(id);
  }
};

const hsrSearchValue = ref<string>("");
const hsrSearchDebounced = refDebounced(hsrSearchValue, 200);

const filtersByPaths = ref<StarRailPaths[]>([]);
const filtersByTypes = ref<StarRailTypes[]>([]);

const shownHsrCharacters = computed(() => {
  let result = STAR_RAIL_CHARACTERS;

  if (filtersByPaths.value.length > 0) {
    result = result.filter((c) => filtersByPaths.value.includes(c.path));
  }

  if (filtersByTypes.value.length > 0) {
    result = result.filter((c) => filtersByTypes.value.includes(c.type));
  }

  if (hsrSearchDebounced.value.length > 0) {
    result = result.filter((c) =>
      c.name.toLowerCase().includes(hsrSearchDebounced.value.toLowerCase()),
    );
  }

  return result;
});

const isPathFiltered = (value: StarRailPaths) => {
  return filtersByPaths.value.includes(value);
};

const isTypeFiltered = (value: StarRailTypes) => {
  return filtersByTypes.value.includes(value);
};

const togglePathFilter = (value: StarRailPaths) => {
  if (filtersByPaths.value.includes(value)) {
    filtersByPaths.value = filtersByPaths.value.filter((filter) => filter !== value);
  } else {
    filtersByPaths.value.push(value);
  }
};

const toggleTypeFilter = (value: StarRailTypes) => {
  if (filtersByTypes.value.includes(value)) {
    filtersByTypes.value = filtersByTypes.value.filter((filter) => filter !== value);
  } else {
    filtersByTypes.value.push(value);
  }
};

const resetFilters = () => {
  filtersByPaths.value = [];
  filtersByTypes.value = [];
  hsrSearchValue.value = "";
};

const includeAllShownCharacters = () => {
  settings.includeIds(...shownHsrCharacters.value.map((c) => c.id));
};

const excludeAllShownCharacters = () => {
  settings.excludeIds(...shownHsrCharacters.value.map((c) => c.id));
};

useHead({
  title: "Honkai Scorer | Settings",
});
</script>

<template>
  <Main class="flex flex-col">
    <section class="font-anuphan container">
      <H1>Settings</H1>
      <P class="text-lg">
        Here you can adjust your pool of characters you are comparing and also modify the cards
        looks just a little bit!
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
    </section>

    <section class="font-anuphan container mt-10">
      <div>
        <H1>Cards</H1>
      </div>
      <div class="mt-4 flex w-fit flex-col gap-2">
        <label class="flex items-center justify-center gap-2">
          <Switch v-model="cardOptions.showTypes" />
          <span class="text-sm leading-none">Show types</span>
        </label>
        <label class="flex items-center justify-center gap-2">
          <Switch v-model="cardOptions.showPaths" />
          <span class="text-sm leading-none">Show paths</span>
        </label>
      </div>
    </section>

    <section class="container mt-10">
      <div>
        <H1>Characters</H1>
        <div class="mt-4 grid grid-cols-2 flex-row gap-2 md:flex">
          <Button variant="secondary" @click="includeAllShownCharacters">Select All</Button>
          <Button variant="secondary" @click="excludeAllShownCharacters">Deselect All</Button>
        </div>
        <div class="mt-4 flex flex-col gap-2">
          <div class="flex flex-wrap gap-3">
            <Input v-model="hsrSearchValue" placeholder="e.g. Firefly" class="h-10 md:max-w-64" />

            <div class="flex flex-wrap gap-2">
              <Button
                v-for="path in CHARACTER_PATHS"
                :key="path"
                class="aspect-square size-10 overflow-hidden p-0"
                :class="cn(isPathFiltered(path) && 'border border-primary')"
                variant="secondary"
                @click="togglePathFilter(path)"
              >
                <img :src="`/img/hsr/ui/${path.toLowerCase()}.webp`" class="size-7" />
              </Button>
            </div>

            <div class="flex flex-wrap gap-2">
              <Button
                v-for="type in CHARACTER_TYPES"
                :key="type"
                class="aspect-square size-10 overflow-hidden p-0"
                :class="cn(isTypeFiltered(type) && 'border border-primary')"
                variant="secondary"
                @click="toggleTypeFilter(type)"
              >
                <img :src="`/img/hsr/ui/${type.toLowerCase()}.webp`" class="size-7" />
              </Button>
            </div>

            <Button
              class="aspect-square size-10 overflow-hidden p-0"
              variant="secondary"
              @click="resetFilters"
            >
              <XIcon class="size-4" />
            </Button>
          </div>
        </div>
      </div>
      <ul
        class="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        <li v-for="c in shownHsrCharacters" :key="c.id">
          <button class="size-full cursor-pointer" @click="() => characterClickHandler(c.id)">
            <CharacterCard
              :character="c"
              :show-path="cardOptions.showPaths"
              :show-type="cardOptions.showTypes"
              :class="
                cn(
                  'transition-transform',
                  settings.isExcludedId(c.id) && 'translate-y-1 opacity-60',
                )
              "
            />
          </button>
        </li>
      </ul>
    </section>
  </Main>
</template>
