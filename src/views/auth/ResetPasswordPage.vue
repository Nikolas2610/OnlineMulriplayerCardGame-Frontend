<template>
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-dark one-page">
        <div class="container py-20">
            <!-- Title -->
            <div class="sm:mx-auto sm:w-full sm:max-w-lg">
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                    Reset Password
                </h2>
            </div>
            <!-- Register Form -->
            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-primary py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form class="space-y-6">
                        <!-- Password Input  -->
                        <div>
                            <label for="password" class="block text-sm font-medium text-white">Password</label>
                            <div class="mt-1">
                                <input id="password" type="password" v-model="userResetPassword.password"
                                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                            </div>
                            <!-- Password Error Messages -->
                            <div v-for="error in v$.password.$errors" :key="error.$uid"
                                class="text-rose-700 text-base font-medium mt-1 px-2">
                                {{ error.$message }}
                            </div>
                        </div>
                        <!-- Confirm Password Input -->
                        <div>
                            <label for="confirmPassword" class="block text-sm font-medium text-white">Confirm
                                Password</label>
                            <div class="mt-1">
                                <input id="confirmPassword" type="password" v-model="userResetPassword.confirmPassword"
                                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                            </div>
                            <!-- Confirm Password error messages -->
                            <div v-for="error in v$.confirmPassword.$errors" :key="error.$uid"
                                class="text-rose-700 text-base font-medium mt-1 px-2">
                                {{ error.$message }}
                            </div>
                        </div>
                        <!-- Submit Form -->
                        <div>
                            <div @click="submitResetPassword()"
                                class="mt-14 flex w-full justify-center rounded-md cursor-pointer border border-transparent bg-dark py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary">
                                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" v-if="loadingButton"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                <div v-else>Submit</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity';
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { required, minLength, sameAs, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useUserStore } from '@/stores/UserStore'
import type UserResetPassword from '@/types/auth/UserResetPassword';
import router from '@/router';
import { useToast } from "vue-toastification";
const toast = useToast();
const userStore = useUserStore();


export default defineComponent({
    setup() {
        onMounted(() => {
            // if user store does not have forgot password token it means the user didn't come from forgot password validation
            if (!userStore.user.forgotPasswordToken) {
                router.push({ name: 'home' });
            }
        })
        // User Object
        const userResetPassword = reactive<UserResetPassword>({
            password: '',
            confirmPassword: ''
        })
        // Loading Button
        const loadingButton = ref<Boolean>(false);
        // Strong Password functions - Uppercase / Lowercase / Number / Special character 
        const passwordUppercase = helpers.regex(/^(?=.*[A-Z]).*$/);
        const passwordLowercase = helpers.regex(/^(?=.*[a-z])/);
        const passwordDigit = helpers.regex(/^(?=.*[0-9])/);
        const passwordSpecialCharacter = helpers.regex(/[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/);
        // Registration Form rules
        const rules = computed(() => {
            return {
                password: {
                    required, minLength: minLength(6),
                    // Strong Password - Uppercase / Lowercase / Number / Special character 
                    passwordUppercase: helpers.withMessage('The Password must contain at least one Uppercase character.', passwordUppercase),
                    passwordLowercase: helpers.withMessage('The Password must contain at least one Lowercase character.', passwordLowercase),
                    passwordDigit: helpers.withMessage('The Password must contain at least one digit.', passwordDigit),
                    passwordSpecialCharacter: helpers.withMessage('The Password must have at least one Special Symbol.', passwordSpecialCharacter),
                },
                confirmPassword: { required, sameAs: sameAs(userResetPassword.password) },
            }
        });
        // Create Validation with rules
        const v$ = useVuelidate(rules, userResetPassword);
        // Submit Form 
        const submitResetPassword = async () => {
            // Set Loading Button 
            loadingButton.value = true;
            // Validate Form 
            await v$.value.$validate()
            // Check for error forms
            if (!v$.value.$error) {
                // Success Form
                const response = await userStore.resetPassword(userResetPassword.password);
                if (response === 'success') {
                    // Reset Register Form
                    resetResetPasswordForm();
                    // Reset Errors Form
                    v$.value.$reset();
                    toast.success(`Your password has been changed!`)
                    router.push({ name: 'login' });
                } else {
                    toast.error(`Reset password fail!\n${response}`)
                }
            } else {
                toast.error(`Please complete correct the form!`)
            }
            // Disable loading button
            loadingButton.value = false;
        }

        const resetResetPasswordForm = () => {
            userResetPassword.password = '';
            userResetPassword.confirmPassword = '';
        }

        return {
            userResetPassword, v$, loadingButton, submitResetPassword
        }
    }
})
</script>