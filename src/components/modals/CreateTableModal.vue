<template>
    <Modal :modalOpen="isModalOpen" @closeModal="$emit('closeModal')">
        <template v-slot:modal_header>
            Create Table
        </template>

        <template v-slot:body>
            <TableForm />
        </template>

        <template v-slot:modal_footer>
            <button
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-primary text-white px-8 py-3 text-base font-medium hover:bg-secondary hover:text-white md:py-3 md:px-10 md:text-lg" @click="tableStore._submit()">
                Submit
            </button>
            <button
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-8 py-3 text-base font-medium text-white hover:bg-secondary hover:text-white md:py-3 md:px-10 md:text-lg ml-2"
                @click="$emit('closeModal')">
                Close
            </button>
        </template>

    </Modal>
</template>

<script setup lang="ts">
import Modal from '../Modal.vue';
import TableForm from '../forms/TableForm.vue';
import { useTableStore } from '@/stores/TableStore';

// TODO: CLean code
const tableStore = useTableStore();
const props = defineProps({
    isModalOpen: { type: Boolean, required: true }
});

const emits = defineEmits(['closeModal']);
tableStore.fetchGames();
</script>
