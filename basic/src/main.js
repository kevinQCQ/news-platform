import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)  // ×¢²á³Ö¾Ã»¯²å¼þ

const app = createApp(App)
app.use(Vant)
app.use(router).use(pinia)
app.mount('#app')