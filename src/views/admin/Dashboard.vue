<template>
    <SideBar :menu-items="menuItems">
        <router-view></router-view>
    </SideBar>
</template>

<script lang="ts" setup>
import SideBar from '@/components/SideBar.vue';
import { useUserStore } from '@/stores/UserStore';
import { onMounted, ref } from 'vue';
import router from '@/router';
import type MenuItem from '@/types/MenuItem';

const userStore = useUserStore();

// Menu list items
const menuItems = ref<MenuItem[]>([
    { name: 'Dashboard', icon: '/src/assets/icons/sidebar/dashboard.svg', router: 'admin-overview' },
    { name: 'Users', icon: '/src/assets/icons/sidebar/people.svg', router: 'admin-users' },
    { name: 'Tables', icon: '/src/assets/icons/sidebar/tables.svg', router: 'admin-tables' },
    { name: 'Games', icon: '/src/assets/icons/sidebar/games.svg', router: 'admin-games' },
    { name: 'Decks', icon: '/src/assets/icons/sidebar/decks.svg', router: 'admin-decks' },
    { name: 'Cards', icon: '/src/assets/icons/sidebar/cards.svg', router: 'admin-cards' },
])

onMounted(() => {
    if (!userStore.isAdmin) {
        console.log('redirect');
        router.push({ name: 'home' })
    }
})

</script>

<style scoped>

</style>