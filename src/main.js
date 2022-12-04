import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './services/config'
import VueTheMask from 'vue-the-mask'

createApp(App).use(router).use(VueTheMask).mount('#app')