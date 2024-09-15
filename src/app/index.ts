import { createHead } from "@unhead/vue";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./providers";

const app = createApp(App).use(createPinia()).use(createHead()).use(router);

export { app };
