import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/tailwind.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { userAuthStore } from './store/AuthStore'
const options = {
              transition: "Vue-Toastification__bounce",
              maxToasts: 10,
              newestOnTop: true
};

// const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(store)
// app.use(pinia)

app.use(Toast, options)
app.use(router)
// createApp(App).use(store).use(pinia).use(Toast, options).use(router).mount('#app')
// setActivePinia(pinia)
// const AuthStore = userAuthStore(pinia)
// setupInterceptors(AuthStore);

app.mount('#app')