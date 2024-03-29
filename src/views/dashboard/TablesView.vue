<template>
    <div class="w-full overflow-x-auto px-4">
        <div v-if="!tableStore.editTable">
            <MyTitle>My Tables</MyTitle>
            <!-- Table -->
            <div class="mx-auto mt-4" v-if="!tableStore.loadingStatus">
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
                                        <tr class="hover:bg-gray-700" v-for="(table, index) in tables"
                                            :key="`table_${table.id}`">
                                            <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                                {{ index + 1 }}
                                            </td>
                                            <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                                {{ table.name }}
                                            </td>
                                            <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                                {{ table.private ? 'YES' : 'NO' }}
                                            </td>
                                            <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white" :class="[
                                                table.status === TableStatus.WAITING ? 'text-blue-500' : '',
                                                table.status === TableStatus.PLAYING || table.status === TableStatus.FINISH ? 'text-primary' : '',
                                                table.status === TableStatus.PLAYER_DISCONNECTED || table.status === TableStatus.PLAYER_LEAVE ? 'text-red-500' : '',
                                                table.status === TableStatus.PAUSE || table.status === TableStatus.GAME_MASTER_EDIT ? 'text-orange-500' : '',
                                            ]">
                                                {{ (StatusTable.find(item => item.id === table.status)?.name) || 'Unknown'
                                                }}
                                            </td>
                                            <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                                {{ table.game?.name }}
                                            </td>
                                            <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                                {{ formattedDate(table.created_at) }}
                                            </td>
                                            <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                                <button class="text-blue-500 hover:underline"
                                                    @click="tableStore.toggleEditTable(index)">
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
            <Flex justify="between">
                <MyTitle>Edit Table</MyTitle>
                <BackButton title="Back to Tables" @click="tableStore.editTable = false"></BackButton>
            </Flex>
            <TableForm @submit="() => tableStore._update()" />
        </div>

        <!-- Confirmation Delete Modal -->
        <Modal :modalOpen="isDeleteModalOpen" @closeModal="deactivateDeleteModal">
            <template v-slot:modal_header>
                Are you sure?
            </template>
            <template v-slot:body>
                <div>
                    Do you really want to delete this table? This process cannot be undone.
                </div>
            </template>
            <template v-slot:modal_footer>
                <ModalSecondaryButton @click="deactivateDeleteModal">
                    Close
                </ModalSecondaryButton>
                <ModalPrimaryButton @click="deleteTable()" :deleteButton="true">
                    Delete
                </ModalPrimaryButton>
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import MyTitle from '@/components/MyTitle.vue';
import { ref, computed } from 'vue';
import { useTableStore } from '@/stores/TableStore';
import TableForm from '@/components/forms/TableForm.vue';
import PreLoader from '@/components/PreLoader.vue';
import { useRoute } from 'vue-router';
import BackButton from '@/components/buttons/BackButton.vue';
import Flex from '@/components/wrappers/Flex.vue';
import ModalSecondaryButton from '@/components/buttons/ModalSecondaryButton.vue';
import ModalPrimaryButton from '@/components/buttons/ModalPrimaryButton.vue';
import { StatusTable } from '@/utils/StatusTable';
import { TableStatus } from '@/types/tables/TableStatus.enum';

const route = useRoute();
const tableStore = useTableStore();
const isDeleteModalOpen = ref(false);
const tables = computed(() => tableStore.tables)
const tablesFields = ref([
    'No', 'NAME', 'PRIVATE', 'STATUS', 'GAME', 'CREATED AT'
]);
route.meta.admin ? tableStore.setUserRole('admin') : tableStore.setUserRole('user');

const deactivateDeleteModal = () => {
    isDeleteModalOpen.value = false;
}

const formattedDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    return `${timeString} - ${dateString}`;
}

const deleteTable = () => {
    isDeleteModalOpen.value = false; // Close Modal
    tableStore._delete();
}

// Open Delete modal confirmation
const openDeleteModal = (id: number) => {
    tableStore.selectedTableId = tables.value[id].id;  // Save the ID of the table to a variable
    isDeleteModalOpen.value = true; // Open Modal
}
tableStore.fetchTables();
tableStore.fetchGames();
</script>
