<script setup lang="ts">
import { ref } from "vue";
import Button from "@/shared/ui/button/Button.vue";
import Dialog from "@/shared/ui/dialog/Dialog.vue";
import Main from "@/shared/ui/main/Main.vue";
import H2 from "@/shared/ui/typography/H2.vue";
import P from "@/shared/ui/typography/P.vue";
import ScreenProgress from "./ScreenProgress.vue";
import ScreenResults from "./ScreenResults.vue";
import ScreenStart from "./ScreenStart.vue";
import { useGame } from "@/features/game/model/store";

const game = useGame();
const showModalReset = ref<boolean>(false);

const confirmReset = () => {
	showModalReset.value = true;
};

const reset = () => {
	showModalReset.value = false;
	game.reset();
};
</script>

<template>
	<Main class="bg-background flex flex-col items-center justify-center pt-4 sm:pt-0">
		<ScreenStart v-if="game.stage === 'START_SCREEN'" />
		<ScreenProgress v-if="game.stage === 'IN_PROGRSS'" @confirm-reset="confirmReset" />
		<ScreenResults v-if="game.stage === 'FINISHED'" @confirm-reset="confirmReset" />
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
