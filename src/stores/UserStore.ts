import { defineStore, acceptHMRUpdate } from "pinia";
import type UserRegister from '@/types/auth/UserRegister';
import type UserForgotPassword from '@/types/auth/UserForgotPassword';
import type UserLogin from "@/types/auth/UserLogin";
import type UserState from '@/types/auth/UserState';
import router from "@/router";
import axiosClient from "@/plugins/axios";
import type { AxiosResponse } from 'axios';
import jwtDecode from "jwt-decode";

export const useUserStore = defineStore("UserStore", {
    state: () => {
        return {
            user: {
                username: null,
                token: null,
                forgotPasswordToken: null
            } as UserState
        }
    },
    getters: {
        authToken: (state) => state.user.token === null ? false : true,
    },
    actions: {
        async register(user: UserRegister) {
            try {
                const { username, email, password } = user;
                const response: AxiosResponse = await axiosClient.post(`auth/register`, { username, email, password });
                return response.status === 201 ? 'success' : 'error';
            } catch (error: any) {
                return error.response ? error.response.data.error : error.message;
            }
        },
        async login(user: UserLogin) {
            try {
                const { email, password } = user;
                const response: AxiosResponse = await axiosClient.post(`auth/login`, { email, password });
                if (response.status === 201) {
                    try {
                        const decodedToken = jwtDecode(response.data.token);
                        console.log(decodedToken);
                        this.$state.user.token = decodedToken.token;
                        this.$state.user.username = decodedToken.user.username;
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('username', response.data.username);
                    } catch (error) {
                        if (process.env.NODE_ENV === 'development') {
                            return error.message
                        } else {
                            return 'Something went wrong. Please try again later!'
                        }
                    }
                }
                return 'success';
            } catch (err: any) {
                return err.response ? err.response.data.error : err.message;
            }
        },
        async logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            this.$state.user.token = null;
            this.$state.user.username = null;
            await router.push({ name: 'home' });
        },
        async forgotPassword(user: UserForgotPassword) {
            try {
                const { email } = user;
                const response: AxiosResponse = await axiosClient.post(`auth/forgot-password`, { email });
                return response.status === 201 ? 'success' : 'error';
            } catch (err: any) {
                return err.response ? err.response.data.error : err.message;
            }
        },
        async userVerify(token: string) {
            try {
                const response: AxiosResponse = await axiosClient.post(`email-confirmation/confirm`, { token });
                return response.status === 201 ? 'success' : 'error';
            } catch (err: any) {
                return err.response ? err.response.data.message : err.message;
            }
        },
        async forgotPasswordVerify(token: string) {
            try {
                const response: AxiosResponse = await axiosClient.post(`email-confirmation/confirm-forgot-password`, { token });
                if (response.status === 201) {
                    this.$state.user.forgotPasswordToken = response.data.token;
                    return 'success';
                }
                return 'error';
            } catch (err: any) {
                return err.response ? err.response.data.message : err.message;
            }
        },
        async resetPassword(password: string) {
            const token = this.$state.user.forgotPasswordToken;
            if (!token) {
                return 'Token not exists. Please request again for reset password.'
            }
            try {
                const response: AxiosResponse = await axiosClient.post(`auth/update-password`, { password, token });
                if (response.status === 201) {
                    this.$state.user.forgotPasswordToken = null;
                    return 'success';
                }
                return 'error';
            } catch (err: any) {
                return err.response ? err.response.data.message : err.message;
            }
        },
    }
})
// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}