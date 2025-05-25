import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index' // 👈 import the router
import '@fortawesome/fontawesome-free/css/all.min.css'


const app = createApp(App)
app.use(router) // 👈 use the router
app.mount('#app')





