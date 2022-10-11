import { defineStore, acceptHMRUpdate } from "pinia";
import type UserRegister from '@/types/auth/UserRegister';
import axios from 'axios'
import type UserLogin from "@/types/auth/UserLogin";
const url = import.meta.env.VITE_API_URL;
export const useUserStore = defineStore("UserStore", {

    state: () => {
        return {
            user: {
                username: '',
                email: '',
                token: ''
            }
        }
    },
    actions: {
        async register(user: UserRegister) {
            const { username, email, password } = user;
            let message = '';
            await axios
                .post(`${url}auth/register`, {
                    username, email, password
                }, {
                    headers: { "Content-Type": "application/json" }
                })
                .then((response) => {
                    if (response.status === 201) {
                        message = 'successs'
                    }
                })
                .catch((err) => {
                    message = err.response.data.error
                })
                return message;
        },
        async login(user: UserLogin) {
            const { email, password, rememberMe } = user;
            let message = '';
            await axios
                .post(`${url}auth/login`, {
                    email, password, rememberMe
                }, {
                    headers: { "Content-Type": "application/json" }
                })
                .then((response) => {
                    if (response.status === 201) {
                        this.$state.user.token = response.data.token;
                        message = 'success';
                    }
                })
                .catch(async (err) => {
                    message = err.response.data.error;
                })
            return message;
        }
    }
})
// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}