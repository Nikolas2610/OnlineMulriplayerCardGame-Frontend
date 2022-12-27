<template>
    <div class="container">
        <PreLoader />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/UserStore'
import PreLoader from '@/components/PreLoader.vue'
import router from '@/router';
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const state = ref({ message: 0, loading: false });
const toast = useToast();

onMounted(async () => {
    state.value.loading = true;
    // Get token from URL
    const token = getToken();
    if (!token) {
        // Redirect to 404 page
        router.push({ name: '404' });
        return
    }
    // Verify user with token and return response
    const response = await userStore.forgotPasswordVerify(token);
    // Check response message to print to the user the correct message
    selectNotification(response);
    // Load the page
    state.value.loading = false;
});

// Select correct message for the user
const selectNotification = (response: string): void => {
    switch (response) {
        case 'success':
            router.push({ name: 'reset-password' });
            break;
        case 'Bad confirmation token':
        case 'Bad Request':
            toast.error('This token is not exists. If you want to login, please create an account!')
            router.push({ name: 'register' });
            break;
        case 'Forgot password token expired':
            toast.error('Your Token has expired. A new email has send to your email activate your account.')
            router.push({ name: 'login' });
            break;
        default:
            toast.error('Something went wrong. Please try again in a few minutes.')
            router.push({ name: 'login' });
            break;
    }
}

// Get token from the URL
const getToken = (): string | null => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('token');
}
</script>
