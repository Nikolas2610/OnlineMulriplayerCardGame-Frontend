<template>
    <div class="border-y border-gray-200 bg-dark">
        <div class="container">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-white">
                <li class="mr-2" v-for="item in items" :key="item.id" @click="activeItem = item.id">
                    <a href="#"
                        class="inline-flex p-4 rounded-t-lg border-b-4 border-transparent transition duration-300 group"
                        :class="activeItem === item.id ? 'border-primary text-primary' : 'hover:border-gray-300 hover:text-gray-600'">
                        <img :src="item.icon" class="mr-2">
                        {{ item.name }}
                    </a>
                </li>
            </ul>
        </div>
    </div>

    <LobbyRoom v-if="activeItem === 1" />
    <CreateTableView v-if="activeItem === 2" />
    <CreateGameView v-if="activeItem === 3" />
    <CreateDeckView v-if="activeItem === 4" />
    <CreateCardView v-if="activeItem === 5" />

</template>

<script setup lang="ts">
import CreateDeckView from './lobby/CreateDeckView.vue';
import CreateCardView from './lobby/CreateCardView.vue';
import CreateTableView from './lobby/CreateTableView.vue';
import CreateGameView from './lobby/CreateGameView.vue';
import LobbyRoom from './lobby/LobbyRoom.vue';

import { ref } from 'vue';

const activeItem = ref(1);
const items = ref([
    { id: 1, name: 'Lobby', icon: '/src/assets/icons/sidebar/joystick.svg' },
    { id: 2, name: 'Create Table', icon: '/src/assets/icons/sidebar/tables.svg' },
    { id: 3, name: 'Create Game', icon: '/src/assets/icons/sidebar/games.svg' },
    { id: 4, name: 'Create Deck', icon: '/src/assets/icons/sidebar/decks.svg' },
    { id: 5, name: 'Create Card', icon: '/src/assets/icons/sidebar/cards.svg' },
])

const setActiveItem = (index: number) => {
    activeItem.value = index;
}
</script>

<style lang="scss" scoped>

</style>