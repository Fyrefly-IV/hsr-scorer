import { computed } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useCounterStore = defineStore("counter", () => {
  const count = useLocalStorage<number>("some-random-counter-to-test-asdad", 0);
  const doubleCount = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});
