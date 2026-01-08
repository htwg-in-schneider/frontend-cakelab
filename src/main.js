import "./assets/style.css";
import { createAuth0 } from "@auth0/auth0-vue";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import Vue3Select from "vue3-select";
import "vue3-select/dist/vue3-select.css";
import "https://unpkg.com/@phosphor-icons/web?module";

const pinia = createPinia();
const auth0 = createAuth0({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
    ...(import.meta.env.VITE_AUTH0_AUDIENCE
      ? { audience: import.meta.env.VITE_AUTH0_AUDIENCE }
      : {}),
  },
});
createApp(App)
  .use(auth0)
  .use(router)
  .use(pinia)
  .component("v-select", Vue3Select)
  .mount("#app");

console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
