<script lang="ts">
  import { CHARACTERS, ComparisonGraph, characterByName, type Character } from "@/data/characters";
  import { randomElement } from "$lib/arrays";
  import { ExcludedCharacters } from "@/stores/characters";
  import CharacterPortrait from "@/components/CharacterPortrait.svelte";
  import difference from "lodash.difference";

  let scores: Record<string, { character: string; value: number; changedAt: number }> = {};
  $: results = Object.values(scores).toSorted((a, b) => b.value - a.value);

  let comparisonGraph: ComparisonGraph = new ComparisonGraph(
    difference(CHARACTERS, $ExcludedCharacters),
  );
  let notConnectedNodes = comparisonGraph.findNonAdjacentPairs();

  $: question = randomElement(notConnectedNodes) ?? [];
  $: characterA = characterByName(question.at(0));
  $: characterB = characterByName(question.at(1));

  function incrementScore(character: string): void {
    const entry = scores[character];

    const value = (entry?.value ?? 0) + 1;
    const changedAt = new Date().getTime();

    scores[character] = { character, changedAt, value };
  }

  function chooseCharacter(chosenCharacter: string, otherCharacter: string): void {
    if (!Array.isArray(question)) {
      return;
    }

    incrementScore(chosenCharacter);
    comparisonGraph.connectByName(chosenCharacter, otherCharacter);
    notConnectedNodes = comparisonGraph.findNonAdjacentPairs();
  }

  function getLeaders(): Character[] {
    const maxScore = results[0].value;
    return results
      .filter((entry) => entry.value === maxScore)
      .map((entry) => CHARACTERS.find((ch) => ch.name === entry.character)!);
  }
</script>

<main
  class="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-900 text-zinc-200"
>
  {#if notConnectedNodes.length > 0}
    <div class="mb-4">
      <h4 class="text-center text-zinc-600">
        {notConnectedNodes.length} pairs left
      </h4>
      <p class="text-center text-zinc-600">you can update character pool in settings (top left)</p>
    </div>
  {/if}

  <div class="flex gap-4 xs:gap-6 md:gap-16">
    {#if question.length > 1}
      <button
        class="flex flex-col items-center"
        on:click={() => chooseCharacter(question[0], question[1])}
      >
        {#if characterA != null}
          <CharacterPortrait character={characterA} />
        {/if}
      </button>

      <button
        class="flex flex-col items-center"
        on:click={() => chooseCharacter(question[1], question[0])}
      >
        {#if characterB != null}
          <CharacterPortrait character={characterB} />
        {/if}
      </button>
    {:else}
      <div class="flex flex-col gap-4 xs:grid xs:grid-cols-[auto_auto] xs:grid-rows-[auto_auto]">
        <h3 class="text-center font-anuphan text-xl font-bold">
          Winner{#if getLeaders().length > 1}<span>s</span>{/if}
        </h3>
        <div class="hidden xs:block"></div>
        <div class="flex flex-col gap-4">
          {#each getLeaders() as leader}
            <CharacterPortrait character={leader} class="pointer-events-none" />
          {/each}
        </div>

        <ol class="hidden list-decimal overflow-hidden xs:block">
          {#each results as entry (entry.character)}
            <li class="list-inside font-anuphan text-lg">
              <span class="font-bold">{entry.character}</span>
              <span> was chosen </span>
              <span class="font-bold">{entry.value} times</span>
            </li>
          {/each}
        </ol>
      </div>
    {/if}
  </div>
</main>
