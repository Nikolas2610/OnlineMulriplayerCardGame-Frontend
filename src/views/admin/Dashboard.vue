<template>
    <SideBar :menu-items="menuItems">
        <div class="bg-gray-300 w-full overflow-x-auto">
            <router-view></router-view>
        </div>
    </SideBar>
</template>

<script lang="ts" setup>
import SideBar from '@/components/SideBar.vue';
import { useUserStore } from '@/stores/UserStore';
import { onMounted, ref, onUnmounted } from 'vue';
import router from '@/router';
import type MenuItem from '@/types/MenuItem';
import { useGameStore } from '@/stores/GameStore'
import { useTableStore } from '@/stores/TableStore'

const gameStore = useGameStore();
const tableStore = useTableStore();
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
        router.push({ name: 'home' })
    }
})

onUnmounted(() => {
    gameStore.unMountedDashboard();
    tableStore.unMountedDashboard();
})

</script>