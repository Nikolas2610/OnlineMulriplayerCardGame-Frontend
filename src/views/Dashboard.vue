<template>
    <Sidebar :menu-items="menuItems">
        <div class="bg-gray-300 w-full overflow-x-auto">
            <router-view></router-view>
        </div>
    </Sidebar>
</template>

<script setup lang="ts">
import Sidebar from '@/components/SideBar.vue'
import type MenuItem from '@/types/MenuItem';
import { ref } from 'vue';

// Menu list items
const menuItems = ref<MenuItem[]>([
    { name: 'Dashboard', icon: '/src/assets/icons/sidebar/dashboard.svg', router: 'overview' },
    { name: 'Tables', icon: '/src/assets/icons/sidebar/tables.svg', router: 'tables' },
    { name: 'Games', icon: '/src/assets/icons/sidebar/games.svg', router: 'games' },
    { name: 'Decks', icon: '/src/assets/icons/sidebar/decks.svg', router: 'decks' },
    { name: 'Cards', icon: '/src/assets/icons/sidebar/cards.svg', router: 'cards' },
    { name: 'Settings', icon: '/src/assets/icons/sidebar/settings.svg', router: 'settings' },
])

</script>

<style scoped>

</style>