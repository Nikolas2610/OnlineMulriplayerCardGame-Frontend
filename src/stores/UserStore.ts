import { defineStore, acceptHMRUpdate } from "pinia";
import type UserRegister from '@/types/auth/UserRegister';
import type UserForgotPassword from '@/types/auth/UserForgotPassword';
import type UserLogin from "@/types/auth/UserLogin";
import type UserState from '@/types/auth/UserState';
import router from "@/router";
import axiosClient from "@/plugins/axios";
import type { AxiosResponse } from 'axios';
import jwtDecode from "jwt-decode";
import { useToast } from "vue-toastification";

const toast = useToast();

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
                email: process.env.NODE_ENV  === 'development' ? 'admin@omcg.com' : '',
                password: process.env.NODE_ENV  === 'development' ? 'CardGame-0' : '',
            } as UserLogin,
            userRegister: {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            } as UserRegister,
            socket_id: null as string | null,
        }
    },
    getters: {
        authToken: (state) => state.user.token === null ? false : true,
        isAdmin: (state) => state.user.role === 'admin',
        getToken: (state) => state.user.token,
        userLoginCredentials: (state) => state.userLogin, 
        isUser: (state) => state.user.role === 'admin' || state.user.role === 'user', 
        getSocketId: (state) => state.socket_id,
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
                    const userId = this.$state.user.id;
                    this.resetValues();
                    localStorage.removeItem('username');
                    localStorage.removeItem('id');
                    await router.push({ name: 'home' });
                    return userId;
                }
                return null;
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
        async registerGuest(username: string) {
            try {
                const response: AxiosResponse = await axiosClient.post(`auth/guest`, { username });
                if (response.status === 201) {
                    this.$state.user.id = response.data.id;
                    this.$state.user.role = response.data.role;
                    this.$state.user.username = response.data.username;
                    localStorage.setItem('username', response.data.username);
                    localStorage.setItem('id', response.data.id);
                    toast.success('Guest user created successfully')
                }
            } catch (err: any) {
                toast.error(err.response ? err.response.data.message : err.message)
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
            this.$state.user.id = null;
        }
    }
})
// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}