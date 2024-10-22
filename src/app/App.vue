<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { RouterView } from "vue-router";
import Footer from "@/widgets/footer/ui/Footer.vue";
import Header from "@/widgets/header/ui/Header.vue";

useHead({
  title: "Honkai Scorer",
});
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<style>
@import "main.css";
</style>
