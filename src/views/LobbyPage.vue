<template>
    <div class="border-y border-gray-200 bg-dark">
        <div class="container">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-white">
                <li class="mr-2" v-for="item in items" :key="item.id">
                    <RouterLink :to="{ name: item.router }"
                        v-if="item.requireAuth ? userStore.authToken ? true : false : true"
                        class="inline-flex p-4 rounded-t-lg border-b-4 border-transparent transition duration-300 group"
                        :class="router.currentRoute.value.name === item.router ? 'border-primary text-primary' : 'hover:border-gray-300 hover:text-gray-600'">
                        <img :src="item.icon" class="mr-2">
                        {{ item.name }}
                    </RouterLink>
                    <button
                        class="inline-flex p-4 rounded-t-lg border-b-4 border-transparent transition duration-300 group cursor-not-allowed"
                        v-else disabled>
                        <img :src="item.icon" class="mr-2">
                        {{ item.name }}
                    </button>
                </li>
            </ul>
        </div>
    </div>

    <router-view></router-view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useRouter } from 'vue-router';
import joystickIcon from '@/assets/icons/sidebar/joystick.svg'
import gamesIcon from '@/assets/icons/sidebar/games.svg'
import decksIcon from '@/assets/icons/sidebar/decks.svg'
import cardsIcon from '@/assets/icons/sidebar/cards.svg'

const router = useRouter();
const userStore = useUserStore();
const items = ref([
    { id: 1, name: 'Lobby', icon: joystickIcon, router: 'lobby-room', requireAuth: false },
    { id: 2, name: 'Create Game', icon: gamesIcon, router: 'create-game', requireAuth: true },
    { id: 3, name: 'Create Deck', icon: decksIcon, router: 'create-deck', requireAuth: true },
    { id: 4, name: 'Create Card', icon: cardsIcon, router: 'create-card', requireAuth: true },
])
</script>