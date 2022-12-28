<template>
    <div class="container w-full overflow-x-auto px-2">
        <div class="w-1/6">
            <div class="text-2xl border-b-4 border-primary py-4 px-2">
                My Decks
            </div>
        </div>

        <!-- Table -->
        <div class="mx-auto mt-4">
            <div class="flex flex-col">
                <div class="overflow-x-auto shadow-md sm:rounded-lg">
                    <div class="inline-block min-w-full align-middle">
                        <div class="overflow-hidden ">
                            <table class="min-w-full divide-y table-fixed divide-gray-700">
                                <thead class="bg-gray-700">
                                    <tr>
                                        <th scope="col" v-for="(title, index) in tablesFields" :key="index"
                                            class="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-gray-400">
                                            {{ title }}
                                        </th>
                                        <th scope="col" class="p-4">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y bg-dark divide-gray-700">
                                    <tr class="hover:bg-gray-700" v-for="(Deck, index) in decks"
                                        :key="`gamme_${Deck.id}`">
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ index + 1 }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ Deck.name }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ Deck.private ? 'YES' : 'NO' }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                            <button class="text-blue-500 hover:underline"
                                                @click="openDetailsModal(index)">
                                                View Details
                                            </button>
                                            <button class="text-red-500 hover:underline ml-2"
                                                @click="openDeleteModal(index)">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Table -->
    </div>

    <!-- Modal Edit Deck -->
    <Modal :modalOpen="isModalOpen" @closeModal="deactiveteModal">
        <template v-slot:modal_header>
            Deck Info
        </template>

        <template v-slot:body>
            <div class="grid grid-cols-2 gap-2" v-if="modalDeck">
                <div class="col-span-2">
                    <div class="mb-3">
                        <label for="name" class="block text-sm font-medium">Name</label>
                        <div class="mt-1">
                            <input id="name" type="text" v-model="modalDeck.name"
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                        </div>
                    </div>
                </div>
                <div class="col-span-2">
                    <div class="mb-3">
                        Cards List
                    </div>
                </div>
                <div class="col-span-2">
                    <div class="mt-1 flex">
                        <label for="private" class="block text-sm font-medium mr-2">Private</label>
                        <input id="private" type="checkbox" v-model="modalDeck.private" class="" />
                    </div>
                </div>
            </div>


        </template>

        <template v-slot:modal_footer>
            <button @click="saveGameChanges()" disabled
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-primary text-white px-8 py-3 text-base font-medium hover:bg-secondary hover:text-white md:py-3 md:px-10 md:text-lg">
                Save Changes
            </button>
            <button
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-8 py-3 text-base font-medium text-white hover:bg-secondary hover:text-white md:py-3 md:px-10 md:text-lg ml-2"
                @click="deactiveteModal">
                Close
            </button>
        </template>

    </Modal>
    <!-- Confirmation Delete Modal -->
    <Modal :modalOpen="isDeleteModalOpen" @closeModal="deactiveteDeleteModal">
        <template v-slot:modal_header>
            Are you sure?
        </template>
        <template v-slot:body>
            <div>
                Do you really want to delete this Deck? This process cannot be undone
            </div>
        </template>
        <template v-slot:modal_footer>
            <button @click="deleteGame" disabled
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-red-500 text-white px-8 py-3 text-base font-medium hover:bg-red-600 hover:text-white md:py-3 md:px-10 md:text-lg">
                Delete
            </button>
            <button @click="deactiveteDeleteModal"
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-8 py-3 text-base font-medium text-white hover:bg-gray-600 hover:text-white md:py-3 md:px-10 md:text-lg ml-2">
                Cancel
            </button>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import axiosUser from '@/plugins/axiosUser';
import type { AxiosResponse } from 'axios';
import { onMounted, ref } from 'vue';
import type Deck from '@/types/decks/Deck'
import Modal from '@/components/Modal.vue';
import { useToast } from "vue-toastification";

const toast = useToast();
const isModalOpen = ref<Boolean>(false);
const isDeleteModalOpen = ref<Boolean>(false);
const decks = ref<Deck[]>([]);
const modalDeck = ref<Deck>();
const selectedGameId = ref<number | null>(null)
const tablesFields = ref([
    'No', 'NAME', 'PRIVATE'
]);

// Get Deck data when component add to the DOM
onMounted(async () => {
    getGamesList();
})
// Close view details modal
const deactiveteModal = () => {
    isModalOpen.value = false;
}
// Close delete modal
const deactiveteDeleteModal = () => {
    isDeleteModalOpen.value = false;
}
// Axios call to get Deck list data
const getGamesList = async () => {
    try {
        const response: AxiosResponse = await axiosUser.get('user/decks');
        decks.value = response.data;
    } catch (error) {
        console.log(error);
    }
}
// Open view details modal
const openDetailsModal = (id: number) => {
    modalDeck.value = { ...decks.value[id] };   // Copy by value the Deck
    selectedGameId.value = decks.value[id].id;  // Save the ID of the Deck to a variable
    isModalOpen.value = true;   // Open Modal
}
// Open Delete modal confirmation
const openDeleteModal = (id: number) => {
    selectedGameId.value = decks.value[id].id;  // Save the ID of the Deck to a variable
    isDeleteModalOpen.value = true; // Open Modal
}
// Axios call to delete a Deck to database
const deleteGame = async () => {
    try {
        if (selectedGameId.value) { // Typescript checks
            // Pass the ID of the Deck
            const response: AxiosResponse = await axiosUser.delete('user/delete/Deck', {
                data: {
                    game_id: selectedGameId.value
                }
            });
            if (response.data.affected === 1) { // Success delete
                toast.success('Deck deleted succesfully');
                isDeleteModalOpen.value = false;
                getGamesList(); // Refresh Deck list
                return
            }
            // Capture the errors
            toast.error('Something went wrong. Please try again later');
        };
    } catch (error: any) {
        // Capture the errors
        toast.error('Something went wrong. Please try again later', error);
    }
}
// Axios call to update the Deck to database
const saveGameChanges = async () => {
    try {
        // Pass the edit Deck object
        const response: AxiosResponse = await axiosUser.patch('user/edit/Deck', modalDeck.value);
        if (response.data.affected === 1) { // Success response from axios
            toast.success('Deck updated succesfully');
            isModalOpen.value = false;
            getGamesList(); // Refresh Deck list
            return
        }
        // Capture the errors
        toast.error('Something went wrong. Please try again later');
    } catch (error: any) {
        // Capture the errors
        toast.error('Something went wrong. Please try again later', error);
    }
}
</script>
