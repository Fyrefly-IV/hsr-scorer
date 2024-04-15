<script lang="ts">
  import { characterById } from "@/data/characters";
  import { completeModeQuiz as quiz } from "@/stores/complete-mode-quiz";
  import CogIcon from "@/components/icons/mini/Cog6ToothMiniIcon.svelte";
  import CharacterPortrait from "@/components/CharacterPortrait.svelte";
  import Modal from "@/components/Modal.svelte";
  import Confirm from "@/components/Confirm.svelte";

  let showScoresModal = false;
  let showRestartModal = false;

  /**
   * TODO:
   *  - Add undo limits
   *  - Make user able to disable undo btn
   */

  $: pair = $quiz.queue.at(-1);
  $: first = characterById(pair?.at(0));
  $: second = characterById(pair?.at(1));

  $: results = Object.values($quiz.scores).toSorted((a, b) => b.value - a.value);
  $: winners = results.filter((entry) => entry.value === results.at(0)?.value);

  $: canUndo = $quiz.choiceHistory.length > 0;

  function chooseFirst() {
    if (first != null) {
      quiz.choose(first.id);
    }
  }

  function chooseSecond() {
    if (second != null) {
      quiz.choose(second.id);
    }
  }

  function undo() {
    if (canUndo) {
      quiz.undo();
    }
  }

  function startQuiz() {
    quiz.create();
  }

  function resetQuiz() {
    quiz.reset();
  }
</script>

<main class="flex min-h-screen w-full flex-col items-center justify-center p-4">
  {#if $quiz.started === false}
    <div>
      <div class="max-w-4xl">
        <h1 class="text-center font-anuphan text-4xl font-bold">Complete Mode</h1>
        <p class="mt-2 text-balance text-center font-anuphan text-zinc-300">
          This mode will let you compare every single combination of characters from your current
          character pool.
        </p>
        <p class="text-balance text-center font-anuphan text-zinc-300">
          Complete mode can be extremely time consuming, so make sure that you have removed unwanted
          characters!
        </p>
      </div>

      <div class="mt-6 flex flex-row justify-center gap-4">
        <button
          on:click={startQuiz}
          class="flex items-center justify-center rounded-md bg-white/5 px-4 py-2 text-center font-anuphan text-xl font-semibold duration-150 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-50"
        >
          Start the Quiz
        </button>
        <a
          href="/config"
          class="flex items-center justify-center rounded-md bg-white/5 px-4 py-2 text-center font-anuphan text-xl font-semibold duration-150 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-50"
        >
          <CogIcon />
        </a>
      </div>
    </div>
  {/if}

  {#if $quiz.started === true && $quiz.queue.length > 0}
    <div class="mb-4">
      <h4 class="text-center text-zinc-600">
        {$quiz.queue.length} pairs left
      </h4>
    </div>
  {/if}

  {#if $quiz.started === true && $quiz.queue.length > 0}
    <div class="flex flex-col">
      <div class="flex flex-col gap-4 sm:flex-row">
        {#if first != null}
          <button on:click={chooseFirst}>
            <CharacterPortrait character={first} />
          </button>
        {/if}

        {#if second != null}
          <button on:click={chooseSecond}>
            <CharacterPortrait character={second} />
          </button>
        {/if}
      </div>

      <div class="mt-8 w-full">
        <div class="flex w-full flex-row items-center gap-2">
          <div
            class="h-1 flex-1 rounded-l-full bg-gradient-to-l from-zinc-500 to-transparent"
          ></div>
          <span class="font-anuphan text-sm font-bold text-zinc-400">CONTROLS</span>
          <div
            class="h-1 flex-1 rounded-r-full bg-gradient-to-r from-zinc-500 to-transparent"
          ></div>
        </div>

        <div class="mt-4 flex w-full flex-col gap-4 sm:grid sm:grid-cols-2">
          <button
            on:click={undo}
            disabled={!canUndo}
            class="flex items-center justify-center rounded-md bg-white/5 px-4 py-2 text-center font-anuphan font-semibold duration-150 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-50"
          >
            Undo Choice
          </button>
          <button
            on:click={() => (showRestartModal = true)}
            class="flex items-center justify-center rounded-md bg-white/5 px-4 py-2 text-center font-anuphan font-semibold duration-150 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-50"
          >
            End Quiz
          </button>
        </div>
      </div>
    </div>
  {/if}

  {#if $quiz.started === true && $quiz.queue.length === 0}
    <div class="flex flex-col items-center">
      <h4 class="mb-2 text-center font-anuphan text-xl font-bold">
        Winner{#if winners.length > 1}s{/if}
      </h4>
      <div class="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        {#each winners as entry}
          {@const character = characterById(entry.characterId)}

          {#if character != null}
            <CharacterPortrait {character} class="pointer-events-none" />
          {/if}
        {/each}
      </div>

      <div class="mt-4 flex flex-col items-center justify-center">
        <button
          on:click={() => (showScoresModal = true)}
          class="rounded bg-transparent px-2 py-1 font-anuphan text-sm font-medium text-zinc-600 duration-150 hover:bg-zinc-800 hover:text-zinc-400"
        >
          Click here to view details
        </button>

        <div class="mt-8 flex flex-row">
          <button
            on:click={() => (showRestartModal = true)}
            class="rounded bg-zinc-800 px-4 py-2 font-anuphan font-semibold text-zinc-400 transition-all duration-150 hover:bg-zinc-700 hover:text-zinc-200 hover:shadow-lg"
          >
            Restart the Quiz
          </button>
        </div>
      </div>
    </div>
  {/if}
</main>

<Confirm bind:showModal={showRestartModal} onConfirm={resetQuiz}>
  <h4 class="mb-2 font-anuphan text-2xl font-bold">Are you sure about restarting?</h4>
  <p class="font-anuphan text-zinc-300">
    Restarting the quiz will result in loss of current progressions!
  </p>
</Confirm>

{#if $quiz.started === true && $quiz.queue.length === 0}
  <Modal bind:showModal={showScoresModal}>
    <h4 class="mb-4 font-anuphan text-2xl font-bold">Characters Scores</h4>
    <ol class="list-inside list-disc font-anuphan text-zinc-300">
      {#each results as entry}
        {@const character = characterById(entry.characterId)}
        {#if character != null}
          <li>
            <span class="font-semibold">{character.name}</span>
            <span> with </span>
            <span class="font-semibold">{entry.value} pts</span>
          </li>
        {/if}
      {/each}
    </ol>
  </Modal>
{/if}
