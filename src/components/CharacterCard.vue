<script setup lang="ts">
import type { Character } from "@/data/schemas";
import { cn } from "@/lib/cn";
import { SparklesIcon } from "lucide-vue-next";

type Props = {
  character: Character;
  hideName?: boolean;
  textUnderName?: string;
  excluded?: boolean;
  hoverable?: boolean;
  width?: number;
  height?: number;
  decoration?: boolean;
  class?: string;
};

const props = withDefaults(defineProps<Props>(), {
  width: 200,
  height: 300,
});

type Emits = {
  click: [payload?: MouseEvent];
};

const emit = defineEmits<Emits>();

const clickHandler = (e: MouseEvent) => {
  emit("click", e);
};
</script>

<template>
  <figure
    @click="clickHandler"
    :class="
      cn(
        'group relative overflow-hidden rounded-lg border border-border bg-secondary/30 transition-transform data-[excluded=true]:translate-y-2 data-[excluded=true]:opacity-30',
        props.class,
      )
    "
    :data-excluded="excluded"
    :data-hoverable="hoverable"
  >
    <img
      :src="character.assets.portrait ?? undefined"
      :style="{ aspectRatio: `${width}/${height}` }"
      class="h-full w-full object-cover transition-transform duration-300 ease-in-out group-data-[hoverable=true]:hover:scale-110"
      draggable="false"
      decoding="async"
      loading="eager"
    />
    <figcaption
      class="absolute inset-x-0 bottom-0 flex flex-col items-center rounded-b-md bg-gradient-to-b from-black/40 to-black/60 px-4 pb-3 pt-2 text-center text-white"
      v-if="hideName !== true"
    >
      <h3 class="relative w-fit font-anuphane text-lg font-semibold">
        <SparklesIcon
          v-if="decoration === true"
          class="absolute -right-3 -top-1 size-4 -scale-x-100 scale-y-100 stroke-emerald-300 opacity-75"
        />
        <span>{{ character.name }}</span>
      </h3>
      <p v-if="typeof textUnderName === 'string'" class="font-anuphane text-sm">
        {{ textUnderName }}
      </p>
    </figcaption>
  </figure>
</template>
