<template>
    <div class="container 2xl:w-4/6 border rounded-lg shadow-xl lg:mt-4">
        <MyTitle>Create Table</MyTitle>
        <TableForm @submit="() => createGame()" />
    </div>
</template>

<script setup lang="ts">
import MyTitle from '@/components/MyTitle.vue';
import TableForm from '@/components/forms/TableForm.vue';
import { useTableStore } from '@/stores/TableStore';

const tableStore = useTableStore();
const createGame = async () => {
    // tableStore._submit();
}
tableStore.fetchGames();
</script>
