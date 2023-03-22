import { createApp } from 'vue'
import router from "./router/index"
import App from './App.vue'

import "../public/iconfont/iconfont.css"
import { store } from "./store/index.js"
const app=createApp(App)
app.use(router)
app.use(store)

app.mount('#app')
