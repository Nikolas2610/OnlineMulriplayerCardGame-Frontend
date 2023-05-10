<template>
    <div class="w-full overflow-x-auto px-4">
        <MyTitle>Users</MyTitle>

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
                                    <tr class="hover:bg-gray-700" v-for="(user, index) in users"
                                        :key="`gamme_${user.id}`">
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ user.id }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ user.username }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ user.email }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ user.role }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap"
                                            :class="user.email_confirmed ? 'text-primary' : 'text-red-500'">
                                            {{ user.email_confirmed ? 'YES' : 'NO' }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ formattedDate(user.created_at) }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ formattedDate(user.updated_at) }}
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

    <!-- Modal Edit User -->
    <Modal :modalOpen="isModalOpen" @closeModal="deactivateModal">
        <template v-slot:modal_header>
            Edit User
        </template>

        <template v-slot:body>
            <div class="" v-if="modalUser">
                <div class="mb-3">
                    <label for="username" class="block text-sm font-medium">Username</label>
                    <div class="mt-1">
                        <input id="username" type="text" v-model="modalUser.username"
                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                    </div>
                </div>
                <div class="mb-3">
                    <label for="email" class="block text-sm font-medium">Email</label>
                    <div class="mt-1">
                        <input id="email" type="email" v-model="modalUser.email"
                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                    </div>
                </div>
                <div class="mb-3">
                    <label for="role" class="block text-sm font-medium">Role</label>
                    <select id="role" v-model="modalUser.role"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <div class="mt-1 flex">
                    <label for="dealer" class="block text-sm font-medium mr-2">Email Confirmed</label>
                    <input id="dealer" type="checkbox" v-model="modalUser.email_confirmed" class="" />
                </div>
            </div>
        </template>

        <template v-slot:modal_footer>
            <ModalSecondaryButton @click="deactivateModal">
                Close
            </ModalSecondaryButton>
            <ModalPrimaryButton @click="updateUser">
                Save Changes
            </ModalPrimaryButton>
        </template>

    </Modal>
    <!-- Confirmation Delete Modal -->
    <Modal :modalOpen="isDeleteModalOpen" @closeModal="deactivateDeleteModal">
        <template v-slot:modal_header>
            Are you sure?
        </template>
        <template v-slot:body>
            <div>
                Do you really want to delete this user? This process cannot be undone.
            </div>
        </template>
        <template v-slot:modal_footer>
            <ModalSecondaryButton @click="deactivateDeleteModal">
                Close
            </ModalSecondaryButton>
            <ModalPrimaryButton @click="deleteUser" :deleteButton="true">
                Delete
            </ModalPrimaryButton>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import MyTitle from '@/components/MyTitle.vue';
import axiosUser from '@/plugins/axiosUser';
import type User from '@/types/User';
import type { AxiosResponse } from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from "vue-toastification";
import ModalSecondaryButton from '@/components/buttons/ModalSecondaryButton.vue';
import ModalPrimaryButton from '@/components/buttons/ModalPrimaryButton.vue';

const toast = useToast();
const users = ref<User[]>([]);
const isModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const modalUser = ref<User>();
const selectedUserId = ref<number | null>(null)
const tablesFields = ref([
    'ID', 'USERNAME', 'EMAIL', 'ROLE', 'EMAIL CONFIRM', 'CREATED AT', 'UPDATED AT'
]);

onMounted(() => {
    getUsersList();
})

// Close Modals
const deactivateModal = () => {
    isModalOpen.value = false;
}
const deactivateDeleteModal = () => {
    isDeleteModalOpen.value = false;
}

// Open view details modal
const openDetailsModal = (id: number) => {
    modalUser.value = { ...users.value[id] };   // Copy by value the game
    selectedUserId.value = users.value[id].id;  // Save the ID of the game to a variable
    isModalOpen.value = true;   // Open Modal
}
// Open Delete modal confirmation
const openDeleteModal = (id: number) => {
    selectedUserId.value = users.value[id].id;  // Save the ID of the game to a variable
    isDeleteModalOpen.value = true; // Open Modal
}

const getUsersList = async () => {
    const response: AxiosResponse = await axiosUser.get(`admin/users`);
    users.value = response.data;
}

const formattedDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    return `${timeString} - ${dateString}`;
}

const deleteUser = async () => {
    try {
        const response: AxiosResponse = await axiosUser.delete(`admin/user/delete`, {
            data: {
                id: selectedUserId.value
            }
        });
        if (response.data.affected === 1) {
            toast.success('User deleted successfully');
            deactivateDeleteModal();
            getUsersList();
            return
        }
        toast.error('Something went wrong. Please try again later');
    } catch (error: any) {
        toast.error(`Something went wrong. Please try again later. \n${error.response.data.message}`);
        deactivateDeleteModal();
    }
}

const updateUser = async () => {
    try {
        const response: AxiosResponse = await axiosUser.patch(`admin/user/edit`, {
            id: modalUser.value?.id,
            username: modalUser.value?.username,
            email: modalUser.value?.email,
            email_confirmed: modalUser.value?.email_confirmed,
            role: modalUser.value?.role,
        });
        if (response.data.affected === 1) {
            toast.success('User updated successfully');
            deactivateModal();
            getUsersList();
            return
        }
        toast.error('Something went wrong. Please try again later');
    } catch (error: any) {
        toast.error('Something went wrong. Please try again later', error);
        deactivateModal();
    }
}
</script>
