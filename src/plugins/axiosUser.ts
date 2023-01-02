import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { useUserStore } from '@/stores/UserStore';
import { useToast } from "vue-toastification";
import router from '@/router';
import { ref } from 'vue';

const toast = useToast();
const userStore = useUserStore();

const axiosUser: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

axiosUser.interceptors.request.use((config) => {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${userStore.getToken}`;
    return config;
  });

axiosUser.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 403 && userStore.authToken) {
            userStore.resetValues();
            toast.error('Your session has been expired. Please try to login again!');
            router.push({ name: 'login' })
        }
        return Promise.reject(error);
    },
);

export default axiosUser;
