<script setup lang="ts">
import { PlayIcon } from "lucide-vue-next";
import { ref } from "vue";
import { TooSmallCharacterPool, useGameStore } from "@/features/game/model/game";
import Button from "@/shared/ui/button/Button.vue";
import Dialog from "@/shared/ui/dialog/Dialog.vue";
import H1 from "@/shared/ui/typography/H1.vue";
import H2 from "@/shared/ui/typography/H2.vue";
import P from "@/shared/ui/typography/P.vue";

const fullMode = useGameStore();

const showModalSmallPool = ref<boolean>(false);

const start = () => {
  try {
    fullMode.start();
  } catch (err) {
    if (err instanceof TooSmallCharacterPool) {
      showModalSmallPool.value = true;
    }
  }
};
</script>

<template>
  <div v-if="fullMode.screen === 'start'" class="flex max-w-[800px] flex-col">
    <H1 class="text-center">Full Compare</H1>
    <P class="text-center">
      In this mode, you will be comparing characters that you can choose from a list in the
      settings. The process may take a significant amount of time, so we recommend ensuring that you
      exclude any characters from the list that you do not wish to compare.
    </P>

    <Button @click="start" class="mt-4 w-fit gap-2 self-center">
      <PlayIcon class="w-4" />
      <span>Start Comparing</span>
    </Button>

    <P class="text-center">
      You don't need to worry about the progress of the comparison; if you haven't disabled cookies
      or are not using incognito mode in your browser, each step is saved in the browser itself, and
      you will be able to return to this page to continue the process!
    </P>
  </div>

  <Dialog v-model="showModalSmallPool">
    <H2 class="font-bold">Chracter pool is too small!</H2>
    <P>
      Looks like your character pool doesn't contain <strong>at least two characters!</strong>
      Head over to settings and select some of the to continue.
    </P>
    <div class="flwx-row mt-4 flex gap-2 self-end">
      <Button size="sm" @click="showModalSmallPool = false">Ok</Button>
    </div>
  </Dialog>
</template>
