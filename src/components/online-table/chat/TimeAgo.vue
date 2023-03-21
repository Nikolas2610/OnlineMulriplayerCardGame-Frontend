<template>
    {{ time }}
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
    created_at: { type: String, required: true }
})

const time = ref();

onMounted(() => {
    time.value = getTimeElapsed();
    setInterval(() => {
        time.value = getTimeElapsed();
    }, 60000)
})

const getTimeElapsed = () => {
    const now = new Date();
    const timestamp = new Date(props.created_at);
    const diff = Math.floor((now.getTime() - timestamp.getTime()) / 1000); // calculate difference in seconds

    if (diff < 60) {
        return `less a minute ago`;
    } else if (diff < 3600) {
        const minutes = Math.floor(diff / 60);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
        const days = Math.floor(diff / 86400);
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
}
</script>
