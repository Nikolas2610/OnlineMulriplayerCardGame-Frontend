<template>
    <div class="container 2xl:w-4/6 border rounded-lg shadow-xl lg:mt-4">
        <MyTitle>Create Table</MyTitle>
        <TableForm @submit="() => createGame()"  />
    </div>
</template>

<script setup lang="ts">
import MyTitle from '@/components/MyTitle.vue';
import TableForm from '@/components/forms/TableForm.vue';
import { useCreateTableStore } from '@/stores/CreateTable';

const createTableStore = useCreateTableStore();

const createGame = async () => {
    console.log("test");
    
    createTableStore._submit();
}
</script>

<style scoped>

</style>