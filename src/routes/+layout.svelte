<script>
  import HomeMiniIcon from "@/components/icons/mini/HomeMiniIcon.svelte";
  import Cog6ToothMiniIcon from "@/components/icons/mini/Cog6ToothMiniIcon.svelte";
  import { onMount } from "svelte";

  import "@/styles/main.css";

  function preloadFallbacks() {
    const portraitImg = new Image();
    portraitImg.src = "/img/v1/portraits/undefined.webp";
  }

  onMount(() => {
    preloadFallbacks();
  });
</script>

<div class="absolute left-0 top-0 z-10 ml-4 mt-4 flex flex-row gap-4">
  <a
    href="/"
    class="group flex aspect-square w-8 items-center justify-center rounded bg-black/30 opacity-75 duration-150 hover:opacity-100"
  >
    <HomeMiniIcon />
  </a>

  <a
    href="/config"
    class="group flex aspect-square w-8 items-center justify-center rounded bg-black/30 opacity-75 duration-150 hover:opacity-100"
  >
    <Cog6ToothMiniIcon />
  </a>
</div>

<slot />
