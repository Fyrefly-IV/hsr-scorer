<script setup lang="ts">
import type { StarRailCharacter } from "@/data/characters";
import { cn } from "@/lib/cn";
import type { ClassValue } from "clsx";
import { useAttrs } from "vue";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

type Props = {
  character: StarRailCharacter;
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
    v-bind="{ ...attrs, class: null }"
    @click="clickHandler"
    :class="
      cn(
        'group relative box-border block aspect-[294/400] w-[220px] overflow-hidden bg-neutral-800 outline outline-1 outline-neutral-700 transition-all data-[excluded=true]:translate-y-2 data-[excluded=true]:opacity-30',
        attrs.class as ClassValue,
      )
    "
    :data-excluded="excluded"
    :data-hoverable="hoverable"
  >
    <img
      :src="character.portraitPath"
      class="aspect-[294/400] w-full select-none duration-300 ease-in-out group-data-[hoverable=true]:group-hover:scale-110"
      draggable="false"
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
