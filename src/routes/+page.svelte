<script lang="ts">
  import { ComparisonGraph } from "@/data/characters";
  import { onMount } from "svelte";
  import { randomElement } from "$lib/arrays";

  const scores: Record<string, { value: number; changedAt: number }> = {};

  let comparisonGraph = new ComparisonGraph();
  let notConnectedNodes = comparisonGraph.findNonAdjacentPairs();

  $: question = randomElement(notConnectedNodes) ?? [];

  function incrementScore(character: string): void {
    const entry = scores[character];

    const value = (entry?.value ?? 0) + 1;
    const changedAt = new Date().getTime();

    scores[character] = { changedAt, value };
  }

  function chooseCharacter(chosenCharacter: string, otherCharacter: string): void {
    if (!Array.isArray(question)) {
      return;
    }

    incrementScore(chosenCharacter);
    comparisonGraph.connect(chosenCharacter, otherCharacter);
    notConnectedNodes = comparisonGraph.findNonAdjacentPairs();
  }

  function findTheWinner(): string | null {
    let maxKey: string | null = null;
    let maxValue = Number.NEGATIVE_INFINITY;
    let maxChangedAt = Number.NEGATIVE_INFINITY;

    for (const key in scores) {
      const { value, changedAt } = scores[key];

      if (value > maxValue || (value === maxValue && changedAt > maxChangedAt)) {
        maxValue = value;
        maxChangedAt = changedAt;
        maxKey = key;
      }
    }

    return maxKey;
  }
</script>

<main class="flex min-h-screen w-full flex-col items-center justify-center">
  <div class="flex gap-10">
    {#if question.length > 1}
      <div class="flex flex-col items-center">
        <h3 class="font-anuphan text-xl font-bold">{question[0]}</h3>
        <button on:click={() => chooseCharacter(question[0], question[1])}>i choose you</button>
      </div>

      <div class="flex flex-col items-center">
        <h3 class="font-anuphan text-xl font-bold">{question[1]}</h3>
        <button on:click={() => chooseCharacter(question[1], question[0])}>i choose you</button>
      </div>

      {:else}

      <div>
        {findTheWinner()}
      </div>
    {/if}
  </div>
</main>
