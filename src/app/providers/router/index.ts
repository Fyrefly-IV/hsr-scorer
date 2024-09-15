import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/home/ui/HomeView.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/pages/settings/ui/SettingsView.vue"),
    },
    {
      path: "/full-compare",
      alias: "/play",
      name: "full-compare",
      component: () => import("@/pages/play/ui/FullCompareView.vue"),
    },
  ],
});
