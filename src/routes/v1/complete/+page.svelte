<script lang="ts">
  import { CHARACTERS, ComparisonGraph, characterByName } from "@/data/characters";
  import { randomElement } from "$lib/arrays";
  import { ExcludedCharacters } from "@/stores/characters";
  import CharacterPortrait from "@/components/CharacterPortrait.svelte";
  import Modal from "@/components/Modal.svelte";

  let showScoresModal = false;
  let scores: Record<string, { character: string; value: number; changedAt: number }> = {};

  $: results = Object.values(scores).toSorted((a, b) => b.value - a.value);
  $: leaders = results
    .filter((entry) => entry.value === results.at(0)?.value)
    .map((entry) => CHARACTERS.find((ch) => ch.name === entry.character)!);

  let comparisonGraph = new ComparisonGraph(
    CHARACTERS.filter((ch) => !$ExcludedCharacters.some((exCh) => exCh.name === ch.name)),
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

  {#if question.length > 1}
    <div class="flex gap-4 xs:gap-6 md:gap-16">
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
    </div>
  {/if}

  {#if question.length === 0 && leaders.length > 0}
    <div class="container flex flex-col items-center justify-center">
      <h3 class="mb-4 font-anuphan text-2xl font-bold">
        Winner{#if leaders.length > 1}s{/if}!
      </h3>

      <div class="flex flex-row items-center justify-center gap-4">
        {#each leaders as character}
          <CharacterPortrait {character} class="pointer-events-none max-h-[300px]" />
        {/each}
      </div>

      <div class="mt-6">
        <button
          class="rounded bg-transparent px-2 py-1 font-anuphan text-sm font-medium text-zinc-600 duration-150 hover:bg-zinc-800 hover:text-zinc-400"
          on:click={() => (showScoresModal = true)}
        >
          Click here to view scores
        </button>

        <Modal bind:showModal={showScoresModal}>
          <h4 class="mb-4 font-anuphan text-2xl font-bold">Characters Scores</h4>
          <ol class="list-inside list-disc font-anuphan text-zinc-300">
            {#each results as entry}
              <li>
                <span class="font-semibold">{entry.character}</span>
                <span> with </span>
                <span class="font-semibold">{entry.value} pts</span>
              </li>
            {/each}
          </ol>
        </Modal>
      </div>
    </div>
  {/if}
</main>
