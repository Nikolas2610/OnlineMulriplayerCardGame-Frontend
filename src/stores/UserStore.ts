import { defineStore, acceptHMRUpdate } from "pinia";
import type UserRegister from '@/types/auth/UserRegister';
import type UserForgotPassword from '@/types/auth/UserForgotPassword';
import axios from 'axios'
import type UserLogin from "@/types/auth/UserLogin";
import router from "@/router";
const url = import.meta.env.VITE_API_URL;
export const useUserStore = defineStore("UserStore", {

    state: () => {
        return {
            user: {
                username: null as String | null,
                token: null as String | null
            },
            forgotPasswordToken: null as JsonWebKey | null
        }
    },
    getters: {
        authToken: (state) => state.user.token === null ? false : true,
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
                        message = 'success'
                    }
                })
                .catch((err) => {
                    err.response ? message = err.response.data.error : message = err.message;
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
                        this.$state.user.username = response.data.username;
                        localStorage.setItem('token', response.data.token)
                        localStorage.setItem('username', response.data.username)
                        message = 'success';
                    }
                })
                .catch(async (err) => {
                    err.response ? message = err.response.data.error : message = err.message;
                })
            return message;
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            this.$state.user.token = null;
            this.$state.user.username = null;
            router.push({ name: 'home' });
        },
        async forgotPassword(user: UserForgotPassword) {
            const { email } = user;
            let message = '';
            console.log('1')
            await axios
                .post(`${url}auth/forgot-password`, {
                    email
                }, {
                    headers: { "Content-Type": "application/json" }
                })
                .then((response) => {
                    if (response.status === 201) {
                        message = 'success'
                    }
                })
                .catch((err) => {     
                    err.response ? message = err.response.data.error : message = err.message;
                })
                console.log('2')
            return message;
        },
        async userVerify(token: string) {
            let message = '';
            await axios
                .post(`${url}email-confirmation/confirm`, {
                    token
                }, {
                    headers: { "Content-Type": "application/json" }
                })
                .then((response) => {
                    if (response.status === 201) {
                        message = 'success'
                    }
                })
                .catch((err) => {
                    message = err.response.data.message
                })
            return message;
        },
        async forgotPasswordVerify(token: string) {
            let message = '';
            await axios
                .post(`${url}email-confirmation/confirm-forgot-password`, {
                    token
                }, {
                    headers: { "Content-Type": "application/json" }
                })
                .then((response) => {
                    if (response.status === 201) {
                        this.$state.forgotPasswordToken = response.data.token;
                        message = 'success'
                    }
                })
                .catch((err) => {
                    err.response ? message = err.response.data.message : message = err.message;
                })
            return message;
        },
        async resetPassword(password: string) {
            const token = this.$state.forgotPasswordToken;
            if (!token) {
                return 'Token not exists. Please request again for reset password.'
            }
            let message = '';
            await axios
                .post(`${url}auth/update-password`, {
                    password, token
                }, {
                    headers: { "Content-Type": "application/json" }
                })
                .then((response) => {
                    if (response.status === 201) {
                        this.$state.forgotPasswordToken = null;
                        message = 'success'
                    }
                })
                .catch((err) => {
                    err.response ? message = err.response.data.message : message = err.message;
                })
            return message;
        },
    }
})
// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}