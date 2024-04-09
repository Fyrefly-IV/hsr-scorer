<script lang="ts">
  import { ComparisonGraph } from "@/data/characters";
  import { onMount } from "svelte";
  import { randomElement } from "$lib/arrays";

  const scores: Record<string, { character: string; value: number; changedAt: number }> = {};
  $: results = Object.values(scores).toSorted((a, b) => b.value - a.value);

  let comparisonGraph = new ComparisonGraph();
  let notConnectedNodes = comparisonGraph.findNonAdjacentPairs();

  $: question = randomElement(notConnectedNodes) ?? [];

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
    comparisonGraph.connect(chosenCharacter, otherCharacter);
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

  <div class="flex gap-10">
    {#if question.length > 1}
      <div class="flex flex-col items-center">
        <h3 class="font-anuphan text-2xl font-bold">{question[0]}</h3>
        <button class="" on:click={() => chooseCharacter(question[0], question[1])}>
          i choose you
        </button>
      </div>

      <div class="flex flex-col items-center">
        <h3 class="font-anuphan text-2xl font-bold">{question[1]}</h3>
        <button on:click={() => chooseCharacter(question[1], question[0])}>i choose you</button>
      </div>
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
