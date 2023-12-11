import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/tailwind.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {
              transition: "Vue-Toastification__bounce",
              maxToasts: 10,
              newestOnTop: true
};
createApp(App).use(store).use(Toast, options).use(router).mount('#app')
