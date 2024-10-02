<script setup lang="ts">
import { SparklesIcon } from "lucide-vue-next";
import { cn } from "@/shared/lib/cn";
import type { StarRailCharacter } from "../model/types";

type Props = {
  character: StarRailCharacter;
  hideName?: boolean;
  textUnderName?: string;
  decoration?: boolean;
  showType?: boolean;
  showPath?: boolean;
  class?: string;
};

const props = withDefaults(defineProps<Props>(), {
  textUnderName: undefined,
  class: "",
});
</script>

<template>
  <article :class="cn('relative overflow-hidden rounded-md border border-border', props.class)">
    <img
      :src="character.assets.portrait ?? undefined"
      class="card-thumbnail aspect-[376/512] h-full w-full object-cover"
      draggable="false"
      decoding="async"
      loading="eager"
    />

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

    <div
      v-if="hideName !== true"
      class="absolute bottom-0 left-0 right-0 flex w-full flex-col items-center bg-gradient-to-b from-black/40 to-black/60 pb-3.5 pt-3 backdrop-blur-sm has-[p]:pb-2.5 has-[p]:pt-2"
    >
      <h3 class="relative font-anuphane text-lg font-semibold leading-none text-white">
        <SparklesIcon
          v-if="decoration"
          class="absolute -left-2.5 -top-2 h-4 w-4 text-emerald-400 opacity-75"
        />
        <span>{{ character.name }}</span>
      </h3>
      <p v-if="typeof textUnderName === 'string' && textUnderName.length > 0">
        {{ textUnderName }}
      </p>
    </div>
  </article>
</template>

<style lang="css" scoped>
button .card-thumbnail {
  transition-property: transform;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}

button:hover .card-thumbnail,
button:active .card-thumbnail {
  transform: scale(1.05);
}
</style>
