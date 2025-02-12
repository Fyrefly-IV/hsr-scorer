<script setup lang="ts">
import { IN_PROGRESS } from "@/features/game/config";
import { useGame } from "@/features/game/model/store";
import Link from "@/shared/ui/link/Link.vue";

const game = useGame();
</script>

<template>
	<footer
		:data-gaming="game.stage === IN_PROGRESS"
		class="border-border mt-6 border-t max-lg:data-[gaming=true]:sr-only"
	>
		<div class="border-border container py-6">
			<p class="text-muted-foreground text-center text-sm text-balance md:text-left">
				Built by a Honkai Star Rail player! The source code is available on
				<Link href="https://github.com/Fyrefly-IV/hsr-scorer">GitHub</Link> for everyone.
			</p>
		</div>
	</footer>
</template>
