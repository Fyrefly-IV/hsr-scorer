<script lang="ts">
  import type { ClassValue } from "clsx";
  import type { Character } from "@/data/characters";
  import { cn } from "@/lib/cn";

  let classes: ClassValue | undefined = undefined;
  let character: Character;

  $: portraitPath = character.portraitPath ?? "/img/v1/portraits/undefined.webp";

  export { character, classes as class };
</script>

<div
  class={cn(
    "group relative block aspect-[9/16] h-[270px] overflow-hidden border border-zinc-700 bg-zinc-800 sm:h-[300px] md:h-[400px]",
    classes,
  )}
>
  <h6
    class="absolute bottom-0 z-10 mb-4 w-full text-center font-anuphan text-xl font-bold md:text-2xl"
  >
    {character.name}
  </h6>
  <div
    style="background-image: url('{portraitPath}');"
    class="relative block h-full w-full overflow-hidden bg-cover bg-center bg-no-repeat shadow-zinc-900 transition-transform duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:bg-gradient-to-t before:from-zinc-900 before:via-transparent before:to-transparent group-hover:scale-110"
  ></div>
</div>
