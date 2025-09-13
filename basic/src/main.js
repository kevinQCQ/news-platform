import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// ��������Vant
import Vant from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)
app.use(Vant) // ����ע��
app.use(router).mount('#app')