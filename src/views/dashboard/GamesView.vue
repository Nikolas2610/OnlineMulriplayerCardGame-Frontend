<template>
    <div class="w-full overflow-x-auto px-4">
        <div v-if="!gameStore.editGame">
            <MyTitle>My Games</MyTitle>
            <!-- Table -->
            <div class="mx-auto mt-4" v-if="!gameStore.loading">
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
                                        <tr class="hover:bg-gray-700" v-for="(game, index) in gameStore.games"
                                            :key="`game_${game.id}`">
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
                                                    @click="gameStore.toggleEditGame(index)">
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
            <PreLoader v-else />
        </div>

        <div v-else>
            <Flex :justify="'between'">                
                <MyTitle>Edit Game</MyTitle>
                <BackButton :title="'Back to Games'" @click="closeEditGame()"></BackButton>
            </Flex>

            <GameForm @submit="updateGame()" />
        </div>
    </div>

    <!-- Confirmation Delete Modal -->
    <Modal :modalOpen="isDeleteModalOpen" @closeModal="deactivateDeleteModal">
        <template v-slot:modal_header>
            Are you sure?
        </template>
        <template v-slot:body>
            <div>
                Do you really want to delete this game? This process cannot be undone
            </div>
        </template>
        <template v-slot:modal_footer>
            <button @click="deleteGame()"
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-red-500 text-white px-8 py-3 text-base font-medium hover:bg-red-600 hover:text-white md:py-3 md:px-10 md:text-lg">
                Delete
            </button>
            <button @click="deactivateDeleteModal" class="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-8 
    font-medium text-white hover:bg-gray-600 hover:text-white md:py-3 md:px-10 md:text-lg ml-2">
                Cancel
            </button>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import MyTitle from '@/components/MyTitle.vue';
import { onMounted, ref } from 'vue';
import Modal from '@/components/Modal.vue';
import { useUserStore } from '@/stores/UserStore';
import { useRoute } from 'vue-router';
import { useGameStore } from '@/stores/GameStore';
import PreLoader from '@/components/PreLoader.vue';
import GameForm from '@/components/forms/GameForm.vue';
import Flex from '@/components/wrappers/Flex.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import BackButton from '@/components/buttons/BackButton.vue'

const gameStore = useGameStore();
const route = useRoute()
const userStore = useUserStore();
const role = ref<string | null>('user');
const isDeleteModalOpen = ref<Boolean>(false);
const selectedGameId = ref<number | null>(null)
const tablesFields = ref([
    'No', 'NAME', 'PLAYERS', 'GRID', 'PRIVATE'
]);

// Get game data when component add to the DOM
onMounted(async () => {
    // Admin Router APIs calls
    if (route.meta.admin) {
        role.value = userStore.$state.user.role;    // user or admin
        gameStore.setUserRole('admin');
    }
    gameStore.fetchGames();
    gameStore.editGame = false;
    gameStore.stepForm.value = 1;
})
// Close delete modal
const deactivateDeleteModal = () => {
    isDeleteModalOpen.value = false;
}
// Open Delete modal confirmation
const openDeleteModal = (id: number) => {
    selectedGameId.value = gameStore.games[id].id;  // Save the ID of the game to a variable
    isDeleteModalOpen.value = true; // Open Modal
}
// Axios call to delete a game to database
const deleteGame = async () => {
    gameStore._delete(selectedGameId.value).finally(() => {
        isDeleteModalOpen.value = false; // Close Modal
    })
}

const closeEditGame = async () => {
    if (gameStore.stepForm.submitted.indexOf(true) !== -1) await gameStore.fetchGames();
    gameStore.editGame = false; 
    gameStore.stepForm.value = 1;
}

const updateGame = async () => {
    if (gameStore.stepForm.change[gameStore.stepForm.value - 1]) {
        gameStore._update();
    } else {
        if (gameStore.stepForm.value === gameStore.stepForm.change.length) {
            if (gameStore.stepForm.submitted.indexOf(true) !== -1) await gameStore.fetchGames();
            gameStore.stepForm.value = 1;
            gameStore.editGame = false;
        } else {
            gameStore.stepForm.value++
        }
    }
}
</script>
