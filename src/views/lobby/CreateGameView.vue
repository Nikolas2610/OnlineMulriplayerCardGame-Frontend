<template>
    <div class="container 2xl:w-4/6 border rounded-lg shadow-xl lg:mt-4">
        <MyTitle>Create Game</MyTitle>
        <GameForm @submit="() => createGame()" />
    </div>
</template>

<script setup lang="ts">
import MyTitle from '@/components/MyTitle.vue';
import GameForm from '@/components/forms/GameForm.vue';
import { useGameStore } from '@/stores/GameStore';

const gameStore = useGameStore();
const createGame = () => {
    if (gameStore.stepForm.change[gameStore.stepForm.value - 1]) {
        gameStore.stepForm.submitted[gameStore.stepForm.value - 1] ?
            gameStore._update() : gameStore._submit();
    } else {
        gameStore.stepForm.value++
    }
}
if (!gameStore.stepForm.submitted[0]) {
    gameStore.clearFormData();
}
</script>