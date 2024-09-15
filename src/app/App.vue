<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { RouterView } from "vue-router";
import Header from "@/widgets/header/ui/Header.vue";

useHead({
  title: "Honkai Scorer",
});
</script>

<template>
  <Header />
  <RouterView />
</template>

<style>
@import "main.css";
</style>
