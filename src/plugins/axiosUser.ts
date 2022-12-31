import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { useUserStore } from '@/stores/UserStore';

const userStore = useUserStore();

export const axiosUser: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStore.getToken}`
    }
});

export default axiosUser;
