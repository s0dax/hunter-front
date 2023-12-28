import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import qs from 'qs'

const app = createApp(App)
app.use(naive).use(store).mount('#app')
app.config.globalProperties.$qs = qs;
