<template>
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-dark one-page">
        <div class="container py-20">
            <!-- Title -->
            <div class="sm:mx-auto sm:w-full sm:max-w-lg">
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                    Register to Join our <br>
                    <span class="text-primary">Creative Gave</span>
                </h2>
            </div>
            <!-- Register Form -->
            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-primary py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form class="space-y-6">
                        <!-- Username input -->
                        <InputField class="text-white" :input="userStore.userRegister.username"
                            :errors="v$.username.$errors" :title="'Username'"
                            @change="(e) => userStore.userRegister.username = e" />
                        <!-- Email Input -->
                        <InputField class="text-white" :input="userStore.userRegister.email" :type="'email'"
                            :errors="v$.email.$errors" :title="'Email'"
                            @change="(e) => userStore.userRegister.email = e" />
                        <!-- Password Input  -->
                        <InputField class="text-white" :input="userStore.userRegister.password" :type="'password'"
                            :errors="v$.password.$errors" :title="'Password'"
                            @change="(e) => userStore.userRegister.password = e" />
                        <!-- Confirm Password Input -->
                        <InputField class="text-white" :input="userStore.userRegister.confirmPassword" :type="'password'"
                            :errors="v$.confirmPassword.$errors" :title="'Confirm password'"
                            @change="(e) => userStore.userRegister.confirmPassword = e" />
                        <!-- Submit Form -->
                        <div>
                            <div @click="register()"
                                class="mt-14 flex w-full justify-center rounded-md cursor-pointer border border-transparent bg-dark py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary">
                                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" v-if="loadingButton"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                <div v-else>Register</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputField from '@/components/ui/InputField.vue';
import { computed } from '@vue/reactivity';
import { ref, onMounted } from 'vue'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useUserStore } from '@/stores/UserStore'
import { useToast } from "vue-toastification";
import router from '@/router';

const userStore = useUserStore();
const toast = useToast();
// Redirect to home page if the user has login
onMounted(() => {
    if (userStore.authToken) {
        router.push({ name: 'home' })
    }
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
        username: { required, minLength: minLength(4) },
        email: { required, email },
        password: {
            required, minLength: minLength(6),
            // Strong Password - Uppercase / Lowercase / Number / Special character 
            passwordUppercase: helpers.withMessage('The Password must contain at least one Uppercase character.', passwordUppercase),
            passwordLowercase: helpers.withMessage('The Password must contain at least one Lowercase character.', passwordLowercase),
            passwordDigit: helpers.withMessage('The Password must contain at least one digit.', passwordDigit),
            passwordSpecialCharacter: helpers.withMessage('The Password must have at least one Special Symbol.', passwordSpecialCharacter),
        },
        confirmPassword: { required, sameAs: sameAs(userStore.userRegister.password) },
    }
});
// Create Validation with rules
const v$ = useVuelidate(rules, userStore.userRegister);
// Submit Form 
const register = async () => {
    // Set Loading Button 
    loadingButton.value = true;
    // Validate Form 
    await v$.value.$validate()
    // Check for error forms
    if (!v$.value.$error) {
        // Success Form
        const response = await userStore.register();
        if (response === 'success') {
            // Reset Errors Form
            v$.value.$reset();
            // TODO: Success Notification and message: Check your email to activate your account
            toast.success(`Registration has been created successfully. We have send an email to ${userStore.userRegister.email} to verify your email address and activate your account.`, {
                timeout: 10000
            })
            // Reset Register Form
            resetRegisterForm();
        } else {
            // TODO: Error Notifications - Server error or email exists (messages from middleware)
            toast.error(`Registation fail. \n${response}`);
        }
    } else {
        // TODO: Error Notifications - Please complete correct the form
        toast.error(`Please complete correct the form`);
    }
    // Disable loading button
    loadingButton.value = false;
}

const resetRegisterForm = () => {
    userStore.userRegister.username = '';
    userStore.userRegister.email = '';
    userStore.userRegister.password = '';
    userStore.userRegister.confirmPassword = '';
}
</script>