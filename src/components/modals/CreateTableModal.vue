<template>
    <Modal :modalOpen="isModalOpen" @closeModal="$emit('closeModal')">
        <template v-slot:modal_header>
            Create Table
        </template>

        <template v-slot:body>
            <TableForm />
        </template>
    </Modal>
</template>

<script setup lang="ts">
import Modal from '../Modal.vue';
import TableForm from '../forms/TableForm.vue';
import { useTableStore } from '@/stores/TableStore';

const tableStore = useTableStore();
const props = defineProps({
    isModalOpen: { type: Boolean, required: true }
});

const emits = defineEmits(['closeModal']);
tableStore.fetchGames();
</script>
