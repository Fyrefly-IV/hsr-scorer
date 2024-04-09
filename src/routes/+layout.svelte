<script>
  import "@/styles/main.css";
  import { onMount } from "svelte";

  function preloadFallbacks() {
    const portraitImg = new Image();
    portraitImg.src = "/img/v1/portraits/undefined.webp";
  }

  onMount(() => {
    preloadFallbacks();
  });
</script>

<slot />
