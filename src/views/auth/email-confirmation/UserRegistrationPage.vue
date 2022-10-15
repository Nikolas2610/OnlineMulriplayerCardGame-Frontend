<template>
    <section class="bg-dark" v-if="state.loading">
        <div class="container py-40">
            <div>
                <!-- Success Email confirmation -->
                <SuccessMessage v-if="state.message === 1" />

                <!-- Email not exists | Wrong Token -->
                <TokenNotExists v-if="state.message === 2" />

                <!-- Token Expire -->
                <TokenExpireMessage v-if="state.message === 3" />

                <!-- Server error -->
                <ServerErrorMessage v-if="state.message === 4" />
            </div>
        </div>
    </section>
    <div class="container" v-else>
        <PreLoader />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/UserStore'
import SuccessMessage from './messages/SuccessMessage.vue'
import ServerErrorMessage from './messages/ServerErrorMessage.vue'
import TokenExpireMessage from './messages/TokenExpireMessage.vue'
import TokenNotExists from './messages/TokenNotExists.vue'
import PreLoader from '@/components/PreLoader.vue'
import router from '@/router';

const userStore = useUserStore();
const state = ref({ message: 0, loading: false });

onMounted(async () => {
    // Get token from URL
    const token = getToken();
    if (!token) {
        // Redirect to 404 page
        router.push({ name: '404' });
        return
    }
    // Verify user with token and return response
    const response = await userStore.userVerify(token);
    // Check response message to print to the user the correct message
    selectNotification(response);
    // Load the page
    state.value.loading = true;
});

// Select correct message for the user
const selectNotification = (response: string): void => {
    switch (response) {
        case 'success':
            state.value.message = 1
            break;
        case 'Bad confirmation token':
        case 'Bad Request':
            state.value.message = 2
            break;
        case 'Email confirmation token expired':
            state.value.message = 3
            break;
        case 'Internal server error':
            state.value.message = 4
            break;
        default:
            state.value.message = 2
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
