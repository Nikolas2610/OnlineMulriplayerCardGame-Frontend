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
                id: null,
                username: null,
                email: null,
                token: null,
                forgotPasswordToken: null,
                role: null
            } as UserState,
            userLogin: {
                email: 'admin@omcg.com',
                password: 'CardGame-0', 
            } as UserLogin,
            userRegister: {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            } as UserRegister
        }
    },
    getters: {
        authToken: (state) => state.user.token === null ? false : true,
        isAdmin: (state) => state.user.role === 'admin',
        getToken: (state) => state.user.token,
        userLoginCredentials: (state) => state.userLogin
    },
    actions: {
        async register() {
            try {
                const { username, email, password } = this.$state.userRegister;
                const response: AxiosResponse = await axiosClient.post(`auth/register`, { username, email, password });
                return response.status === 201 ? 'success' : 'error';
            } catch (error: any) {
                return error.response ? error.response.data.error : error.message;
            }
        },
        async login() {
            try {
                const { email, password } = this.$state.userLogin;
                const response: AxiosResponse = await axiosClient.post(`auth/login`, { email, password });
                if (response.status === 201) {
                    this.decodeToken(response.data.token);
                }
                return 'success';
            } catch (err: any) {
                return err.response ? err.response.data.error : err.message;
            }
        },
        async logout() {
            try {
                const response: AxiosResponse = await axiosClient.post('auth/logout', {
                    email: this.$state.user.email
                })
                if (response.data.affected === 1) {
                    this.resetValues();
                    await router.push({ name: 'home' });
                }
            } catch (error) {
                console.log(error);
            }
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
        decodeToken(token: string) {
            const decodedToken: any = jwtDecode(token);
            this.$state.user.token = token;
            this.$state.user.username = decodedToken.user.username;
            this.$state.user.email = decodedToken.user.email;
            this.$state.user.role = decodedToken.user.role;
            this.$state.user.id = decodedToken.user.id;
            localStorage.setItem('token', token);
        },
        resetValues() {
            localStorage.removeItem('token');
            this.$state.user.token = null;
            this.$state.user.username = null;
            this.$state.user.email = null;
            this.$state.user.role = null;
        }
    }
})
// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}