<script setup lang="ts">
import type { Character } from "@/data/characters";
import { cn } from "@/lib/cn";
import type { ClassValue } from "clsx";
import { useAttrs } from "vue";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

type Props = {
  character: Character;
  hideName?: boolean;
  textUnderName?: string;
  excluded?: boolean;
  hoverable?: boolean;
  width?: number;
  height?: number;
};

withDefaults(defineProps<Props>(), {
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
    v-bind="{ ...attrs, class: null }"
    @click="clickHandler"
    :class="
      cn(
        'group relative overflow-hidden rounded-lg border border-border bg-secondary/30 data-[excluded=true]:translate-y-2 data-[excluded=true]:opacity-30',
        attrs.class as ClassValue,
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
      class="absolute inset-x-0 bottom-0 bg-gradient-to-b from-black/30 to-black/50 px-4 py-3 text-center text-white"
      v-if="hideName !== true"
    >
      <h3 class="font-anuphane text-lg font-semibold">
        {{ character.name }}
      </h3>
      <p v-if="typeof textUnderName === 'string'" class="font-anuphane text-sm">
        {{ textUnderName }}
      </p>
    </figcaption>
  </figure>
</template>
