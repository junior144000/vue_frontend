import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index' // 👈 import the router
import '@fortawesome/fontawesome-free/css/all.min.css'
import { createPinia } from 'pinia'


const app = createApp(App)
const pinia = createPinia()
app.use(pinia) // 👈 use Pinia for state management

import { useAuthStore } from './stores/authStore'
const authStore = useAuthStore()
authStore.initialize() // 🔑 load token from localStorage

app.use(router) // 👈 use the router
app.mount('#app')





