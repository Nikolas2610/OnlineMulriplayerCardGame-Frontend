<template>
    <div class="border-y border-gray-200 bg-dark">
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

    <CreateDeckView v-if="activeItem === 2" />
    <CreateCardView v-if="activeItem === 3" />

    
</template>

<script setup lang="ts">
import CreateDeckView from './CreateDeckView.vue';
import CreateCardView from './CreateCardView.vue';

import { ref } from 'vue';

const activeItem = ref(1);
const items = ref([
    { id: 1, name: 'Create Game', icon: '/src/assets/icons/sidebar/games.svg' },
    { id: 2, name: 'Create Deck', icon: '/src/assets/icons/sidebar/decks.svg' },
    { id: 3, name: 'Create Card', icon: '/src/assets/icons/sidebar/cards.svg' },
])

const setActiveItem = (index: number) => {
    activeItem.value = index;
}

</script>

<style scoped>

</style>