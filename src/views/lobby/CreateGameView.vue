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
    if (createGameStore.stepForm.change[createGameStore.stepForm.value - 1]) {
        console.log("continue");
        createGameStore.stepForm.submitted[createGameStore.stepForm.value - 1] ?
            createGameStore._update() : createGameStore._submit();
    } else {
        createGameStore.stepForm.value++
        console.log(createGameStore.stepForm.value);
        
        console.log("no continue");
    }
}
if (!createGameStore.stepForm.submitted[0]) {
    createGameStore.clearFormData();
}
</script>