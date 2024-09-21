<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "@/features/game/model/game";
import Button from "@/shared/ui/button/Button.vue";
import Dialog from "@/shared/ui/dialog/Dialog.vue";
import Main from "@/shared/ui/main/Main.vue";
import H2 from "@/shared/ui/typography/H2.vue";
import P from "@/shared/ui/typography/P.vue";
import ScreenProgress from "./ScreenProgress.vue";
import ScreenResults from "./ScreenResults.vue";
import ScreenStart from "./ScreenStart.vue";

const fullMode = useGameStore();
const showModalReset = ref<boolean>(false);

const confirmReset = () => {
  showModalReset.value = true;
};

const reset = () => {
  showModalReset.value = false;
  fullMode.reset();
};
</script>

<template>
  <Main class="flex flex-col items-center justify-center bg-background pt-4 sm:pt-0">
    <ScreenStart v-if="fullMode.screen === 'start'" />
    <ScreenProgress v-if="fullMode.screen === 'progress'" @confirm-reset="confirmReset" />
    <ScreenResults v-if="fullMode.screen === 'results'" @confirm-reset="confirmReset" />
  </Main>

  <Dialog v-model="showModalReset">
    <H2 class="font-bold">Are you sure?</H2>
    <P>
      You are about to completely reset current comparison progress!
      <br />
      This means, you will not be able to revert this action!
    </P>
    <div class="mt-4 flex flex-row gap-2 self-end">
      <Button size="sm" @click="showModalReset = false">Cancel</Button>
      <Button size="sm" variant="destructive" @click="reset">Confirm</Button>
    </div>
  </Dialog>
</template>
