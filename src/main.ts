import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import { options } from '@/plugins/notifications'
import FloatingVue from 'floating-vue'
import "vue-toastification/dist/index.css";
import './assets/styles/app.scss';
import 'floating-vue/dist/style.css'


const app = createApp(App)

app.use(createPinia());
app.use(router);
app.use(Toast, options);
app.use(FloatingVue);
app.mount('#app')