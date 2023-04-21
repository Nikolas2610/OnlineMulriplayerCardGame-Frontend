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
import { ref, onUnmounted } from 'vue';
import { useGameStore } from '@/stores/GameStore'
import { useTableStore } from '@/stores/TableStore'
import decks from '@/assets/icons/sidebar/decks.svg'
import dashboard from '@/assets/icons/sidebar/dashboard.svg'
import table from '@/assets/icons/sidebar/tables.svg'
import games from '@/assets/icons/sidebar/games.svg'
import cards from '@/assets/icons/sidebar/cards.svg'
import settings from '@/assets/icons/sidebar/settings.svg'

const gameStore = useGameStore();
const tableStore = useTableStore();
// Menu list items
const menuItems = ref<MenuItem[]>([
    { name: 'Dashboard', icon: dashboard, router: 'overview' },
    { name: 'Tables', icon: table, router: 'tables' },
    { name: 'Games', icon: games, router: 'games' },
    { name: 'Decks', icon: decks, router: 'decks' },
    { name: 'Cards', icon: cards, router: 'cards' },
    { name: 'Settings', icon: settings, router: 'settings' },
])

onUnmounted(() => {
    gameStore.unMountedDashboard();
    tableStore.unMountedDashboard();
})

</script>