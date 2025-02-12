<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";
import { HomeIcon, MonitorIcon, MoonStarIcon, SettingsIcon, SunIcon } from "lucide-vue-next";
import { ref } from "vue";
import { useThemeStore } from "@/features/theme-switch/model/theme.store";
import Button from "@/shared/ui/button/Button.vue";

const nav = [
	{
		icon: HomeIcon,
		name: "Home",
		href: "/",
	},
	{
		icon: SettingsIcon,
		name: "Settings",
		href: "/settings",
	},
];

const themeStore = useThemeStore();
const isSwitcherOpen = ref(false);

function closeSwitcher() {
	isSwitcherOpen.value = false;
}
</script>

<template>
	<header class="bg-background h-header border-border sticky top-0 z-50 border-b">
		<div class="container flex h-full flex-row items-center">
			<nav class="flex flex-row gap-2">
				<RouterLink v-for="endpoint in nav" :key="endpoint.href" :to="endpoint.href">
					<Button variant="outline" size="icon">
						<component :is="endpoint.icon" class="size-4" />
					</Button>
				</RouterLink>
			</nav>

			<div class="flex flex-1 justify-end gap-2">
				<div v-on-click-outside="closeSwitcher" class="relative">
					<Button variant="outline" size="icon" @click="isSwitcherOpen = !isSwitcherOpen">
						<component :is="themeStore.isDark === true ? MoonStarIcon : SunIcon" class="size-4" />
					</Button>

					<div
						v-if="isSwitcherOpen"
						class="border-border bg-background absolute right-0 mt-2 grid grid-flow-row grid-cols-[1fr] gap-0.5 rounded-md border p-2"
					>
						<Button
							size="sm"
							variant="ghost"
							class="items-center justify-start gap-2"
							@click="themeStore.setThemeDark"
						>
							<MoonStarIcon class="size-4" />
							<span>Dark</span>
						</Button>
						<Button
							size="sm"
							variant="ghost"
							class="items-center justify-start gap-2"
							@click="themeStore.setThemeLight"
						>
							<SunIcon class="size-4" />
							<span>Light</span>
						</Button>
						<Button
							size="sm"
							variant="ghost"
							class="items-center justify-start gap-2"
							@click="themeStore.setThemeAuto"
						>
							<MonitorIcon class="size-4" />
							<span>Auto</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>
