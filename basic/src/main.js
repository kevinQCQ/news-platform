import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 完整导入Vant
import Vant from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)
app.use(Vant) // 完整注册
app.use(router).mount('#app')