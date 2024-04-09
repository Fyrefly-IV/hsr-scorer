<script lang="ts">
  import type { Character } from "@/data/characters";

  export let character: Character;

  $: portraitPath = character.portraitPath ?? "/img/v1/portraits/undefined.webp";
</script>

<div class="relative max-w-[300px]">
  <img
    style="image-rendering: pixelated;"
    src={portraitPath}
    alt="{character.name} portrait"
    class="aspect-[9/16] h-[300px] object-cover"
  />
</div>
