<template>
    <div class="w-full overflow-x-auto px-4">
        <div v-if="!editCard">
            <MyTitle>My Cards</MyTitle>
            <!-- Table -->
            <div class="mx-auto my-4">
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
                                        <tr class="hover:bg-gray-700" v-for="(card, index) in cards"
                                            :key="`gamme_${card.id}`">
                                            <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                                {{ index + 1 }}
                                            </td>
                                            <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                                {{ card.name }}
                                            </td>
                                            <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                                <img :src="loadImage(card.image)" :alt="card.name" class="w-20 h-32">
                                            </td>
                                            <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                                {{ card.private ? 'YES' : 'NO' }}
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
                <MyTitle>Edit Card</MyTitle>
                <BackButton title="Back to Cards" @click="editCard = false"></BackButton>
            </Flex>
            <CardForm @sendData="saveCardChanges" :successResponse="successResponse" :cardData="modalCard"
                :imageFile="imageFile" :edit="true" />
        </div>
    </div>

    <!-- Confirmation Delete Modal -->
    <Modal :modalOpen="isDeleteModalOpen" @closeModal="deactivateDeleteModal">
        <template v-slot:modal_header>
            Are you sure?
        </template>
        <template v-slot:body>
            <div>
                Do you really want to delete this card? This process cannot be undone
            </div>
        </template>
        <template v-slot:modal_footer>
            <ModalSecondaryButton @click="deactivateDeleteModal">
                Close
            </ModalSecondaryButton>
            <ModalPrimaryButton @click="deleteCard" :deleteButton="true">
                Delete
            </ModalPrimaryButton>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import CardForm from '@/components/forms/CardForm.vue';
import MyTitle from '@/components/MyTitle.vue';
import axiosUser from '@/plugins/axiosUser';
import type { AxiosResponse } from 'axios';
import { onMounted, ref } from 'vue';
import type Card from '@/types/cards/Card'
import Modal from '@/components/Modal.vue';
import { useToast } from "vue-toastification";
import type CreateCard from '@/types/cards/CreateCard';
import { useUserStore } from '@/stores/UserStore';
import { useRoute } from 'vue-router';
import { loadImage } from '@/utils/helpers';
import Flex from '@/components/wrappers/Flex.vue';
import BackButton from '@/components/buttons/BackButton.vue';
import ModalSecondaryButton from '@/components/buttons/ModalSecondaryButton.vue';
import ModalPrimaryButton from '@/components/buttons/ModalPrimaryButton.vue';

const userStore = useUserStore();
const route = useRoute()
const role = ref<string | null>('user');
const toast = useToast();
const isDeleteModalOpen = ref<boolean>(false);
const cards = ref<Card[]>([]);
const modalCard = ref<Card>();
const selectedCardId = ref<number | null>(null)
const imageFile = ref();
const editCard = ref(false)
const successResponse = ref(-1)
const tablesFields = ref([
    'No', 'NAME', 'IMAGE', 'PRIVATE'
]);

// Get game data when component add to the DOM
onMounted(async () => {
    // Admin Router APIs calls
    if (route.meta.admin) {
        role.value = userStore.$state.user.role;    // user or admin
    }
    getCardsList();
})
// Close delete modal
const deactivateDeleteModal = () => {
    isDeleteModalOpen.value = false;
}
// Axios call to get game list data
const getCardsList = async () => {
    try {
        const response: AxiosResponse = await axiosUser.get(`${role.value}/cards`);
        cards.value = response.data;
    } catch (error) {
        process.env.NODE_ENV === 'development' ? console.log(error) : ''
    }
}
// Open view details modal
const openDetailsModal = (id: number) => {
    modalCard.value = { ...cards.value[id] };   // Copy by value the game
    imageFile.value = modalCard.value.image // Load Card image
    selectedCardId.value = cards.value[id].id;  // Save the ID of the game to a variable
    editCard.value = true;  // Open Card
}
// Open Delete modal confirmation
const openDeleteModal = (id: number) => {
    selectedCardId.value = cards.value[id].id;  // Save the ID of the game to a variable
    isDeleteModalOpen.value = true; // Open Modal
}
// Axios call to delete a game to database
const deleteCard = async () => {
    try {
        if (selectedCardId.value) { // Typescript checks
            // Pass the ID of the game
            const response: AxiosResponse = await axiosUser.delete(role.value === 'admin' ? 'admin/card' : 'card', {
                data: {
                    card_id: selectedCardId.value
                }
            });
            if (response.data.affected === 1) { // Success delete
                toast.success('Card deleted successfully');
                isDeleteModalOpen.value = false;
                getCardsList(); // Refresh game list
                return
            }
            // Capture the errors
            toast.error('Something went wrong. Please try again later');
        };
    } catch (error: any) {
        // Capture the errors
        toast.error(error.response.data.error);
        isDeleteModalOpen.value = false;
    }
}
// Axios call to update the game to database
const saveCardChanges = async (card: CreateCard, image: any, cardData: Card) => {
    try {
        let path = '';
        const formData = new FormData()
        if (image.file) {
            formData.append('image', image.file, image.name)
            path = '/image'
        }
        formData.append('id', cardData.id.toString());
        formData.append('name', card.name)
        formData.append('private', card.private.toString());
        // Pass the edit game object
        const response: AxiosResponse = await axiosUser.patch(role.value === 'admin' ? `admin/card${path}` : `card${path}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (response.status === 200) {
            toast.success('Card updated successfully');
            getCardsList();
            editCard.value = false;
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
