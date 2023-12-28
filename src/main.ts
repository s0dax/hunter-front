import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import qs from 'qs'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(naive).use(ElementPlus).mount('#app')
app.config.globalProperties.$qs = qs;
