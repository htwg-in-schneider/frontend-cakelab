import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia'
import Vue3Select from 'vue3-select'
import 'vue3-select/dist/vue3-select.css'

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .component('v-select', Vue3Select)
  .mount('#app')

