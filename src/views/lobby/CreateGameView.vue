<template>
    <div class="container 2xl:w-4/6 border rounded-lg shadow-xl lg:mt-4">
        <MyTitle>Create Game</MyTitle>
        <GameForm @submit="() => createGame()" />
    </div>
</template>

<script setup lang="ts">
import MyTitle from '@/components/MyTitle.vue';
import GameForm from '@/components/forms/GameForm.vue';
import { useCreateGameStore } from '@/stores/GameStore';

const createGameStore = useCreateGameStore();
const createGame = () => {
    createGameStore._submit();
}
</script>