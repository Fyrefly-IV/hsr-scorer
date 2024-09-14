import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { router } from "./providers";

const app = createApp(App).use(createPinia()).use(router);

export { app };