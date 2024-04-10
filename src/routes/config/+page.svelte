<script lang="ts">
  import type { Character } from "@/data/characters";
  import { CHARACTERS } from "@/data/characters";
  import { ExcludedCharacters } from "@/stores/characters";
  import CharacterPortrait from "@/components/CharacterPortrait.svelte";

  $: isExcluded = (character: Character) => {
    return $ExcludedCharacters.findIndex((ch) => ch.name === character.name) !== -1;
  };

  const handleCharacterClick = (character: Character) => {
    return () => {
      const excludedId = $ExcludedCharacters.findIndex((ch) => ch.name === character.name);

      if (excludedId === -1) {
        $ExcludedCharacters = [...$ExcludedCharacters, character];
        console.debug(`Exlcuding ${character.name}`);
      } else {
        $ExcludedCharacters = $ExcludedCharacters.filter((ch) => ch.name !== character.name);
        console.debug(`Including ${character.name}`);
      }
    };
  };

  const handleIncludeAll = () => {
    $ExcludedCharacters = [];
  };

  const handleExcludeAll = () => {
    $ExcludedCharacters = [...CHARACTERS];
  };
</script>

<main class="box-border flex flex-col items-center p-4 pb-12">
  <div class="container mt-16">
    <h2 class="font-anuphan text-4xl font-semibold text-white">Character Pool Configuration</h2>
    <p class="text-justify font-anuphan text-lg">
      On this page you will be able to select characters you'd like to see in your quizes, simply
      click on one of them to inlcude or exclude the character!
    </p>
  </div>

  <div class="container mt-6 flex flex-col gap-4 md:block">
    <button
      on:click={handleIncludeAll}
      class="rounded bg-zinc-800 px-4 py-2 font-anuphan font-medium transition-colors duration-150 hover:bg-zinc-700 active:translate-y-0.5"
    >
      Include all
    </button>
    <button
      on:click={handleExcludeAll}
      class="rounded bg-zinc-800 px-4 py-2 font-anuphan font-medium transition-colors duration-150 hover:bg-zinc-700 active:translate-y-0.5"
    >
      Exclude all
    </button>
  </div>

  <div class="container mt-4 flex flex-row flex-wrap justify-evenly gap-x-6 gap-y-8">
    {#each CHARACTERS as character}
      <button
        class="group flex"
        data-excluded={isExcluded(character)}
        on:click={handleCharacterClick(character)}
      >
        <CharacterPortrait
          {character}
          class="group-data-[excluded=true]:translate-y-2 group-data-[excluded=true]:opacity-30 md:h-[300px]"
        />
      </button>
    {/each}
  </div>
</main>
