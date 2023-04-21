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
import decks from '@/assets/icons/sidebar/decks.svg'
import dashboard from '@/assets/icons/sidebar/dashboard.svg'
import table from '@/assets/icons/sidebar/tables.svg'
import games from '@/assets/icons/sidebar/games.svg'
import cards from '@/assets/icons/sidebar/cards.svg'
import people from '@/assets/icons/sidebar/people.svg'

const gameStore = useGameStore();
const tableStore = useTableStore();
const userStore = useUserStore();

// Menu list items
const menuItems = ref<MenuItem[]>([
    { name: 'Dashboard', icon: dashboard, router: 'admin-overview' },
    { name: 'Users', icon: people, router: 'admin-users' },
    { name: 'Tables', icon: table, router: 'admin-tables' },
    { name: 'Games', icon: games, router: 'admin-games' },
    { name: 'Decks', icon: decks, router: 'admin-decks' },
    { name: 'Cards', icon: cards, router: 'admin-cards' },
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