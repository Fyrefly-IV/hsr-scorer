<script setup lang="ts">
import { MoonIcon, PlayIcon, Settings2Icon, SunIcon } from "lucide-vue-next";
import { RouterLink, useRouter } from "vue-router";
import Button from "@/shared/ui/button/Button.vue";
import CardHeader from "@/shared/ui/card/CardHeader.vue";
import CardTitle from "@/shared/ui/card/CardTitle.vue";
import CardContent from "@/shared/ui/card/CardContent.vue";
import CardFooter from "@/shared/ui/card/CardFooter.vue";
import Card from "@/shared/ui/card/Card.vue";
import { useThemeStore } from "@/features/theme-switch/model/theme.store";
import H2 from "@/shared/ui/typography/H2.vue";
import P from "@/shared/ui/typography/P.vue";
import { ref } from "vue";
import Dialog from "@/shared/ui/dialog/Dialog.vue";
import { useGame } from "@/features/game/model/store";

const game = useGame();
const theme = useThemeStore();
const router = useRouter();

const startModalOpen = ref(false);

function start() {
	try {
		game.start();
		router.push("/play");
	} catch (e) {
		alert("error!");
		console.error(e);
	}
}
</script>

<template>
	<main class="bg-background text-foreground h-svh-main flex items-center justify-center p-4">
		<Card class="w-full max-w-md">
			<CardHeader>
				<CardTitle class="text-center text-4xl font-bold">Honkai Scorer</CardTitle>
			</CardHeader>
			<CardContent class="space-y-6">
				<p class="text-muted-foreground text-center">
					Compare and rank your favorite Honkai Star Rail characters in this strategic showdown.
				</p>
				<Button size="lg" class="w-full" @click="startModalOpen = true">
					<PlayIcon class="mr-2 h-4 w-4" />
					<span>Play Now</span>
				</Button>
			</CardContent>
			<CardFooter class="flex justify-between">
				<Button variant="outline" size="icon" @click="theme.switchTheme">
					<SunIcon
						class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
					/>
					<MoonIcon
						class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
				<RouterLink to="/settings">
					<Button variant="outline">
						<Settings2Icon class="mr-2 h-4 w-4" /><span class="leading-none">Settings</span>
					</Button>
				</RouterLink>
			</CardFooter>
		</Card>
	</main>

	<Dialog v-model="startModalOpen">
		<H2 class="font-bold">We're about to start!</H2>
		<P class="text-prettyp">
			The process of comparing many characters might take a while!<br />
			Don't worry, you can close the tab and come back to comparing whenever you feel like it!
		</P>
		<div class="mt-2 flex gap-2 self-end">
			<Button variant="outline" @click="startModalOpen = false">Cancel</Button>
			<Button variant="default" @click="start()">Proceed</Button>
		</div>
	</Dialog>
</template>
