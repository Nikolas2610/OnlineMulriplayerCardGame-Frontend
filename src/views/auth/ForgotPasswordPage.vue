<template>
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-dark one-page">
        <div class="container py-20">
            <!-- Title -->
            <div class="sm:mx-auto sm:w-full sm:max-w-lg">
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                    Forgot Password
                </h2>
            </div>
            <!-- Login Form -->
            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-primary py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form class="space-y-6">
                        <!-- Email Input -->
                        <div>
                            <label for="email" class="block text-sm font-medium text-white">Email address</label>
                            <div class="mt-1">
                                <input id="email" type="email" v-model="forgotPassword.email"
                                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                            </div>
                            <!-- Email error messages -->
                            <div v-for="error in v$.email.$errors" :key="error.$uid"
                                class="text-rose-700 text-base font-medium mt-1 px-2">
                                {{error.$message}}
                            </div>
                        </div>
                        <!-- Submit Form -->
                        <div>
                            <div @click="submitForgotPassword()"
                                class="mt-14 flex w-full justify-center rounded-md border border-transparent bg-dark py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary">
                                <!-- Loading Animation -->
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
import { defineComponent, reactive, ref } from 'vue'
import { required, email } from '@vuelidate/validators';
import { computed } from '@vue/reactivity';
import { useVuelidate } from '@vuelidate/core'
import { useUserStore } from '@/stores/UserStore'
import { useToast } from "vue-toastification";
const toast = useToast();
import type UserForgotPassword from '@/types/auth/UserForgotPassword';
const userStore = useUserStore();

export default defineComponent({
    setup() {
        // User Object
        const forgotPassword = reactive<UserForgotPassword>({
            email: '',
        })
        // Loading Button
        const loadingButton = ref<Boolean>(false);
        const rules = computed(() => {
            return {
                email: { required, email },
            }
        });
        // Create Validation with rules
        const v$ = useVuelidate(rules, forgotPassword);
        // Submit Form 
        const submitForgotPassword = async () => {
            // Set Loading Button 
            loadingButton.value = true;
            // Validate Form 
            await v$.value.$validate()
            // Check for error forms
            if (!v$.value.$error) {
                // Success Form
                // ***Import axios
                const response: string = await userStore.forgotPassword(forgotPassword);
                // ***Possible errors: The email does not exist | Wrong Password | Confirm your email first | Bad Request(Wrong fields) | Server Error
                if (response === 'success') {
                    v$.value.$reset();
                    toast.success(`An email has been send to ${forgotPassword.email} to reset your password`)
                    resetForgotPasswordForm();
                } else {
                    // TODO: Error Notifications - Server error or credentials (messages from middleware)
                    toast.error(`${response}`)
                }
            } else {
                // TODO: Error Notifications - Please complete correct the form
                toast.error(`Please complete correct the form`)
            }
            // Disable loading button
            loadingButton.value = false;
        }

        const resetForgotPasswordForm = () => {
            forgotPassword.email = '';
        }

        return {
            v$, submitForgotPassword, loadingButton, forgotPassword
        }
    }
})
</script>