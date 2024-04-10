<script lang="ts">
  import { ComparisonGraph, characterByIndex, characterByName } from "@/data/characters";
  import { randomElement } from "$lib/arrays";
  import CharacterPortrait from "@/components/CharacterPortrait.svelte";

  const scores: Record<string, { character: string; value: number; changedAt: number }> = {};
  $: results = Object.values(scores).toSorted((a, b) => b.value - a.value);

  let comparisonGraph = new ComparisonGraph();
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
</script>

<main
  class="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-900 text-zinc-200"
>
  {#if notConnectedNodes.length > 0}
    <h4 class="mb-4 text-center text-zinc-600">
      {notConnectedNodes.length} pairs left
    </h4>
  {/if}

  <div class="flex gap-16">
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
      <div class="flex flex-col">
        <ol class="list-decimal">
          {#each results as entry (entry.character)}
            <li class="font-anuphan text-lg">
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
