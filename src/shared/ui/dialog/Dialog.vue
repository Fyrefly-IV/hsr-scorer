<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";
import { effect, ref, watch } from "vue";
import { cn } from "@/shared/lib/cn";

const open = defineModel<boolean>({ required: true });
const dialog = ref<HTMLDialogElement>();

const close = () => {
  open.value = false;
};

effect(() => {
  if (open.value && dialog.value) {
    dialog.value.showModal();
  }
});

watch(
  () => open.value,
  (s) => {
    if (s === false) {
      dialog.value?.close();
    }
  },
);
</script>

<template>
  <Teleport to="body">
    <dialog ref="dialog" :open="open">
      <div
        v-if="open === true"
        v-on-click-outside="close"
        :class="
          cn('flex w-full max-w-[600px] flex-col rounded-md border border-border bg-background p-4')
        "
      >
        <slot />
      </div>
    </dialog>
  </Teleport>
</template>

<style lang="css">
dialog::backdrop {
  background: rgba(0, 0, 0, 0.7);
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
