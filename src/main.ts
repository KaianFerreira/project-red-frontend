import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import './style.css'

// Create and configure Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Create the app
const app = createApp(App)

// Use plugins
app.use(pinia)
app.use(router)

// Mount the app
app.mount('#app')