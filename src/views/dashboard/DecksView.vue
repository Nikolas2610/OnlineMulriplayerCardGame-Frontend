<template>
    <div class="w-full overflow-x-auto px-4">
        <div v-if="!editDeck">
            <MyTitle>My Decks</MyTitle>

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

        <div v-else>
            <Flex justify="between">
                <MyTitle>Edit Deck</MyTitle>
                <BackButton title="Back to Decks" @click="editDeck = false"></BackButton>
            </Flex>
            <DeckForm @sendData="saveDeck" :deckData="modalDeck" :edit="true" />
        </div>
    </div>
    <!-- Confirmation Delete Modal -->
    <Modal :modalOpen="isDeleteModalOpen" @closeModal="deactivateDeleteModal">
        <template v-slot:modal_header>
            Are you sure?
        </template>
        <template v-slot:body>
            <div>
                Do you really want to delete this Deck? This process cannot be undone
            </div>
        </template>
        <template v-slot:modal_footer>
            <ModalSecondaryButton @click="deactivateDeleteModal">
                Close
            </ModalSecondaryButton>
            <ModalPrimaryButton @click="deleteDeck" :deleteButton="true">
                Delete
            </ModalPrimaryButton>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import DeckForm from '@/components/forms/DeckForm.vue';
import MyTitle from '@/components/MyTitle.vue';
import axiosUser from '@/plugins/axiosUser';
import type { AxiosResponse } from 'axios';
import { onMounted, ref } from 'vue';
import type Deck from '@/types/decks/Deck'
import Modal from '@/components/Modal.vue';
import { useToast } from "vue-toastification";
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/UserStore';
import Flex from '@/components/wrappers/Flex.vue';
import BackButton from '@/components/buttons/BackButton.vue';
import ModalSecondaryButton from '@/components/buttons/ModalSecondaryButton.vue';
import ModalPrimaryButton from '@/components/buttons/ModalPrimaryButton.vue';

const userStore = useUserStore();
const route = useRoute()
const toast = useToast();
const isDeleteModalOpen = ref<boolean>(false);
const decks = ref<Deck[]>([]);
const modalDeck = ref<Deck>();
const selectedDeckId = ref<number | null>(null)
const editDeck = ref(false);
const role = ref<string | null>('user');
const tablesFields = ref([
    'No', 'NAME', 'PRIVATE'
]);


// Get Deck data when component add to the DOM
onMounted(async () => {
    // Admin Router APIs calls
    if (route.meta.admin) {
        role.value = userStore.$state.user.role;    // user or admin
    }
    getDecksList();
})
// Close delete modal
const deactivateDeleteModal = () => {
    isDeleteModalOpen.value = false;
}
// Axios call to get Deck list data
const getDecksList = async () => {
    try {
        const response: AxiosResponse = await axiosUser.get(`${role.value}/decks`);
        decks.value = response.data;
    } catch (error) {
        process.env.NODE_ENV === 'development' ? console.log(error) : ''
    }
}
// Open view details modal
const openDetailsModal = (id: number) => {
    modalDeck.value = { ...decks.value[id] };   // Copy by value the Deck
    selectedDeckId.value = decks.value[id].id;  // Save the ID of the Deck to a variable
    editDeck.value = true;
}
// Open Delete modal confirmation
const openDeleteModal = (id: number) => {
    selectedDeckId.value = decks.value[id].id;  // Save the ID of the Deck to a variable
    isDeleteModalOpen.value = true; // Open Modal
}
// Axios call to delete a Deck to database
const deleteDeck = async () => {
    try {
        if (selectedDeckId.value) { // Typescript checks
            // Pass the ID of the Deck
            const response: AxiosResponse = await axiosUser.delete(role.value === 'admin' ? 'admin/deck' : 'deck', {
                data: {
                    deck_id: selectedDeckId.value
                }
            });
            if (response.data.affected === 1) { // Success delete
                toast.success('Deck deleted successfully');
                isDeleteModalOpen.value = false;
                getDecksList(); // Refresh Deck list
                return
            }
            // Capture the errors
            toast.error('Something went wrong. Please try again later');
        };
    } catch (error: any) {
        // Capture the errors
        toast.error(error.response.data.message);
    }
}
// Axios call to update the Deck to database
const saveDeck = async (deck: Deck) => {
    try {
        // Pass the edit Deck object
        const response: AxiosResponse = await axiosUser.patch(role.value === 'admin' ? 'admin/deck' : 'deck', deck);
        if (response.status === 200) { // Success response from axios
            toast.success('Deck updated successfully');
            editDeck.value = false;
            getDecksList(); // Refresh Deck list
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
