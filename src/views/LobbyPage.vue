<template>
    <div class="text-7xl text-center my-10">
        This is a Lobby Page
    </div>
    <div class="text-primary text-4xl text-center">
        Hello <span class="capitalize font-semibold">{{ userStore.user.username  }}</span> 
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore'
const userStore = useUserStore();

</script>

<style lang="scss" scoped>

</style>