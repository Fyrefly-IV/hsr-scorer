<script setup lang="ts">
import type { Character } from "@/data/characters";

type Props = {
  character: Character;
  hideName?: boolean;
  excluded?: boolean;
  hoverable?: boolean;
};

defineProps<Props>();

type Emits = {
  click: [payload?: MouseEvent];
};

const emit = defineEmits<Emits>();

const clickHandler = (e: MouseEvent) => {
  emit("click", e);
};
</script>

<template>
  <picture
    @click="clickHandler"
    class="group relative box-border block aspect-[294/400] w-[220px] overflow-hidden bg-neutral-800 outline outline-1 outline-neutral-700 transition-all data-[excluded=true]:translate-y-2 data-[excluded=true]:opacity-30"
    :data-excluded="excluded"
    :data-hoverable="hoverable"
  >
    <img
      :src="character.portraitPath"
      class="aspect-[294/400] w-full duration-300 ease-in-out group-data-[hoverable=true]:group-hover:scale-110"
      decoding="async"
      loading="eager"
    />
    <div class="absolute bottom-0 mb-4 w-full text-center" v-if="hideName !== true">
      <h4 class="font-anuphan text-xl font-bold md:text-2xl">
        {{ character.name }}
      </h4>
    </div>
  </picture>
</template>
