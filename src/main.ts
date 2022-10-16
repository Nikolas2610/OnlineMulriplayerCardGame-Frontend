import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import { options } from '@/tools/notifications'
import "vue-toastification/dist/index.css";



import './assets/styles/app.scss';

const app = createApp(App)

app.use(createPinia());
app.use(router);
app.use(Toast, options);
app.mount('#app')
