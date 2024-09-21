<script setup lang="ts">
import { SparklesIcon } from "lucide-vue-next";
import { cn } from "@/shared/lib/cn";
import type { StarRailCharacter } from "../model/types";

type Props = {
  character: StarRailCharacter;
  hideName?: boolean;
  textUnderName?: string;
  excluded?: boolean;
  hoverable?: boolean;
  width?: number;
  height?: number;
  decoration?: boolean;
  showType?: boolean;
  showPath?: boolean;
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
      class="h-full w-full object-cover transition-transform duration-300 ease-in-out group-data-[hoverable=true]:hover:scale-105"
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
    <div
      v-if="showPath === true || showType === true"
      class="absolute left-0 top-0 flex w-full justify-between px-1 pt-1 [&_img]:drop-shadow-[0_1px_1px_#000]"
    >
      <img
        v-if="showType"
        :src="`/img/hsr/ui/${character.type.toLowerCase()}.webp`"
        class="aspect-square size-8"
      />
      <img
        v-if="showPath"
        :src="`/img/hsr/ui/${character.path.toLowerCase()}.webp`"
        class="aspect-square size-8"
      />
    </div>
  </figure>
</template>
