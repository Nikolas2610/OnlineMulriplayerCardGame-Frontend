<template>
    <div class="w-full overflow-x-auto px-4">
        <MyTitle>My Games</MyTitle>

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
                                    <tr class="hover:bg-gray-700" v-for="(game, index) in games"
                                        :key="`gamme_${game.id}`">
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ index + 1 }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ game.name }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ game.min_players }} - {{ game.max_players }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ game.grid_rows }}
                                            <span class="text-primary">X</span>
                                            {{ game.grid_cols }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ game.private ? 'YES' : 'NO' }}
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

    <!-- Modal Edit Game -->
    <Modal :modalOpen="isModalOpen" @closeModal="deactiveteModal">
        <template v-slot:modal_header>
            Game Info
        </template>

        <template v-slot:body>
            <div class="grid grid-cols-2 gap-2" v-if="modalGame">
                <div class="col-span-2">
                    <div class="mb-3">
                        <label for="name" class="block text-sm font-medium">Name</label>
                        <div class="mt-1">
                            <input id="name" type="text" v-model="modalGame.name"
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                        </div>
                    </div>
                </div>
                <div class="col-span-1">
                    <div class="mb-3">
                        <label for="min_players" class="block text-sm font-medium">Min Players</label>
                        <div class="mt-1">
                            <input id="min_players" type="number" max="10" min="1" v-model="modalGame.min_players"
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                        </div>
                    </div>
                </div>
                <div class="col-span-1">
                    <div class="mb-3">
                        <label for="max_players" class="block text-sm font-medium">Max Players</label>
                        <div class="mt-1">
                            <input id="max_players" type="number" max="10" min="1" v-model="modalGame.max_players"
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                        </div>
                    </div>
                </div>
                <div class="col-span-1">
                    <div class="mb-3">
                        <label for="grid_rows" class="block text-sm font-medium">Grid Rows</label>
                        <div class="mt-1">
                            <input id="grid_rows" type="number" max="6" min="1" v-model="modalGame.grid_rows"
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                        </div>
                    </div>
                </div>
                <div class="col-span-1">
                    <div class="mb-3">
                        <label for="grid_cols" class="block text-sm font-medium">Grid Columns</label>
                        <div class="mt-1">
                            <input id="grid_cols" type="number" max="6" min="1" v-model="modalGame.grid_cols"
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                        </div>
                    </div>
                </div>
                <div class="col-span-2">
                    <div class="mb-3">
                        <label for="description" class="block text-sm font-medium">Description</label>
                        <textarea name="" id="description" v-model="modalGame.description" rows="4"
                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm"></textarea>
                    </div>
                </div>
                <div class="col-span-2">
                    <div class="mt-1 flex">
                        <label for="private" class="block text-sm font-medium mr-2">Private</label>
                        <input id="private" type="checkbox" v-model="modalGame.private" class="" />
                    </div>
                </div>
                <div class="col-span-2">
                    <div class="mt-1 flex">
                        <label for="status_player" class="block text-sm font-medium mr-2">Status Player</label>
                        <input id="status_player" type="checkbox" v-model="modalGame.status_player" class="" />
                    </div>
                </div>
                <div class="col-span-2">
                    <div class="mt-1 flex">
                        <label for="rank" class="block text-sm font-medium mr-2">Rank Game</label>
                        <input id="rank" type="checkbox" v-model="modalGame.rank" class="" />
                    </div>
                </div>
                <div class="col-span-2">
                    <div class="mt-1 flex">
                        <label for="dealer" class="block text-sm font-medium mr-2">Dealer</label>
                        <input id="dealer" type="checkbox" v-model="modalGame.dealer" class="" />
                    </div>
                </div>
            </div>


        </template>

        <template v-slot:modal_footer>
            <button @click="saveGameChanges()"
                class="btn-primary">
                Save Changes
            </button>
            <button
                class="btn-grey ml-2"
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
                Do you really want to delete this game? This process cannot be undone
            </div>
        </template>
        <template v-slot:modal_footer>
            <button @click="deleteGame"
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-red-500 text-white px-8 py-3 text-base font-medium hover:bg-red-600 hover:text-white md:py-3 md:px-10 md:text-lg">
                Delete
            </button>
            <button @click="deactiveteDeleteModal" class="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-8 
font-medium text-white hover:bg-gray-600 hover:text-white md:py-3 md:px-10 md:text-lg ml-2">
                Cancel
            </button>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import MyTitle from '@/components/MyTitle.vue';
import axiosUser from '@/plugins/axiosUser';
import type { AxiosResponse } from 'axios';
import { onMounted, ref } from 'vue';
import type Game from '@/types/games/Game'
import Modal from '@/components/Modal.vue';
import { useToast } from "vue-toastification";
import { useUserStore } from '@/stores/UserStore';
import { useRoute } from 'vue-router';

const route = useRoute()
const userStore = useUserStore();
const toast = useToast();
const role = ref<string | null>('user');
const isModalOpen = ref<Boolean>(false);
const isDeleteModalOpen = ref<Boolean>(false);
const games = ref<Game[]>([]);
const modalGame = ref<Game>();
const selectedGameId = ref<number | null>(null)
const tablesFields = ref([
    'No', 'NAME', 'PLAYERS', 'GRID', 'PRIVATE'
]);

// Get game data when component add to the DOM
onMounted(async () => {
    // Admin Router APIs calls
    if (route.meta.admin) {
        role.value = userStore.$state.user.role;    // user or admin
    }
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
// Axios call to get game list data
const getGamesList = async () => {
    try {
        const response: AxiosResponse = await axiosUser.get(`${role.value}/games`);
        games.value = response.data;
    } catch (error) {
        console.log(error);
    }
}
// Open view details modal
const openDetailsModal = (id: number) => {
    modalGame.value = { ...games.value[id] };   // Copy by value the game
    selectedGameId.value = games.value[id].id;  // Save the ID of the game to a variable
    isModalOpen.value = true;   // Open Modal
}
// Open Delete modal confirmation
const openDeleteModal = (id: number) => {
    selectedGameId.value = games.value[id].id;  // Save the ID of the game to a variable
    isDeleteModalOpen.value = true; // Open Modal
}
// Axios call to delete a game to database
const deleteGame = async () => {
    try {
        if (selectedGameId.value) { // Typescript checks
            // Pass the ID of the game
            const response: AxiosResponse = await axiosUser.delete(`${role.value}/delete/game`, {
                data: {
                    game_id: selectedGameId.value
                }
            });
            if (response.data.affected === 1) { // Success delete
                toast.success('Game deleted successfully');
                isDeleteModalOpen.value = false;
                getGamesList(); // Refresh game list
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
// Axios call to update the game to database
const saveGameChanges = async () => {
    try {
        // Pass the edit game object
        const response: AxiosResponse = await axiosUser.patch(`${role.value}/edit/game`, modalGame.value);
        if (response.data.affected === 1) { // Success response from axios
            toast.success('Game updated successfully');
            isModalOpen.value = false;
            getGamesList(); // Refresh game list
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
