<script lang="ts">
  import { cn } from "@/lib/cn";
  import type { ClassValue } from "clsx";

  let classes: ClassValue = null;
  let showModal: boolean;
  let dialog: HTMLDialogElement;

  let onConfirm: () => void = () => {};

  $: if (dialog && showModal) dialog.showModal();

  function handleCofirm() {
    onConfirm();
    dialog?.close();
  }

  export { onConfirm, showModal, classes as class };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
  class={cn(
    "relative w-full max-w-[32em] rounded bg-zinc-800 p-4 outline outline-1 outline-zinc-600 backdrop-blur-sm",
    classes,
  )}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation class="flex flex-col">
    <slot />

    <div class="mt-4 flex flex-row gap-2">
      <button
        on:click={handleCofirm}
        class="block self-end rounded bg-sky-800 px-4 py-2 font-anuphan text-sm font-medium transition-colors duration-150 hover:bg-sky-800/70 sm:bottom-4 sm:right-4"
      >
        confirm
      </button>

      <button
        on:click={() => dialog.close()}
        class="block self-end rounded bg-zinc-900 px-4 py-2 font-anuphan text-sm font-medium transition-colors duration-150 hover:bg-zinc-900/70 sm:bottom-4 sm:right-4"
      >
        cancel
      </button>
    </div>
  </div>
</dialog>

<style>
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }

  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
