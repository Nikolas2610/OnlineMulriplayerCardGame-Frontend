<template>
    <Container>
        <DarkTable :table-headers="tablesFields" v-if="filterTables.length > 0">
            <DarkTableRow v-for="(table, i) in filterTables" :key="`lobby-row-${table.id}`"
                @click="handleSelectTable(i, table)" :class="selectTable === i ? 'bg-gray-700' : ''">
                <DarkTableCell>
                    {{ table.name }}
                </DarkTableCell>
                <DarkTableCell>
                    {{ table.game?.name }}
                </DarkTableCell>
                <DarkTableCell>
                    {{ table.table_users?.length ? table.table_users.length : 0 }}
                </DarkTableCell>
                <DarkTableCell>
                    <Flex>
                        <div v-if="table.private">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="w-6 h-6 text-red-500" viewBox="0 0 16 16">
                                <path
                                    d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                            </svg>
                        </div>
                        <div v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="w-6 h-6 text-primary" viewBox="0 0 16 16">
                                <path
                                    d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
                            </svg>
                        </div>
                    </Flex>
                </DarkTableCell>
                <DarkTableCell>
                    {{ table.creator?.username }}
                </DarkTableCell>
                <DarkTableCell :class="[table.status === TableStatus.WAITING ? 'text-blue-500' : '', table.status === TableStatus.PLAYING ? 'text-primary' : '', table.status === TableStatus.PAUSE ? 'text-yellow-500' : '']" class="capitalize">
                    {{ table.status }}
                </DarkTableCell>
            </DarkTableRow>
        </DarkTable>

        <GridCol :all="2" class="mt-3 px-2">
            <GridColItem :all="1">
                <InputField :input="search" :placeholder="'Search a Table..'" @change="(value) => search = value" />
            </GridColItem>
            <GridColItem :all="1">
                <Flex :justify="'center'" :gap="2">
                    <PrimaryButton :title="'Create Table'" @click="createTableModal = true"
                        v-if="userStore.user.role !== Roles.guest"></PrimaryButton>
                    <PrimaryButton :title="'Join Table'" :disable="selectTable === -1" @click="joinRoom()"></PrimaryButton>
                    <RemoveButton v-if="playerStore.table?.creator?.id === userStore.user.id"
                        @click="playerStore._removeTable()" />
                </Flex>
            </GridColItem>
        </GridCol>

    </Container>

    <CreateTableModal :is-modal-open="createTableModal" @close-modal="() => createTableModal = false"
        v-if="userStore.user.role !== Roles.guest" />
    <ModalSetGuestUsername :is-modal-open="isOpenModalSetGuestUsername" @close-modal="isOpenModalSetGuestUsername = false"
        @register-guest="(username: string) => registerGuest(username)" />
    <ModalSetPasswordTable :is-modal-open="isOpenModalSetTablePassword" @close-modal="isOpenModalSetTablePassword = false"
        @set-password-table="(password: string) => validatePassword(password)" />
</template>

<script setup lang="ts">
import DarkTable from '@/components/table/DarkTable.vue'
import Container from '@/components/wrappers/Container.vue'
import DarkTableRow from '@/components/table/DarkTableRow.vue';
import DarkTableCell from '@/components/table/DarkTableCell.vue';
import { ref, onBeforeMount, watch } from 'vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import Flex from '@/components/wrappers/Flex.vue';
import InputField from '@/components/ui/InputField.vue';
import GridCol from '@/components/wrappers/GridCol.vue';
import GridColItem from '@/components/wrappers/GridColItem.vue';
import CreateTableModal from '@/components/modals/CreateTableModal.vue';
import { useUserStore } from '@/stores/UserStore';
import { usePlayerStore } from '@/stores/PlayerStore';
import socket from '@/plugins/socket'
import { useRouter } from 'vue-router';
import RemoveButton from '@/components/buttons/RemoveButton.vue';
import type { Table } from '@/types/tables/Table';
import ModalSetGuestUsername from '@/components/modals/ModalSetGuestUsername.vue';
import { Roles } from '@/types/Roles.enum';
import ModalSetPasswordTable from '@/components/modals/ModalSetPasswordTable.vue';
import { useToast } from 'vue-toastification';
import { TableStatus } from '@/types/tables/TableStatus.enum';


const isOpenModalSetGuestUsername = ref(false);
const isOpenModalSetTablePassword = ref(false);

const router = useRouter()
const userStore = useUserStore();
const tables = ref<Table[]>([]);
const filterTables = ref<Table[]>([]);
const toast = useToast();
const playerStore = usePlayerStore();
const search = ref('');
const createTableModal = ref(false);

onBeforeMount(() => {
    if (!userStore.user.id) {
        isOpenModalSetGuestUsername.value = true;
    }
    // Get active tables
    socket.emit('findAllOnlineTable', {}, (response: Table[]) => {
        tables.value = filterTables.value = response;
    });
    // Add a new table - Update list
    socket.on('addNewTable', (response: Table) => {
        response.table_users = [];
        tables.value.unshift(response);
    });
    // Remove table - Update list
    socket.on('removeOldTable', (response) => {
        tables.value = filterTables.value = tables.value.filter(table => table.id !== response);
    })
    // Update players to the tables
    socket.on('getTableUsers', (tableGame: Table) => {
        const index = tables.value.map(table => table.id).indexOf(tableGame.id);

        if (index !== -1) {
            tables.value[index].table_users = tableGame.table_users;
        }
    })
})

const joinRoom = () => {
    if (playerStore.table) {
        if (playerStore.table.private) {
            isOpenModalSetTablePassword.value = true;
        } else {
            router.push({ name: 'room', params: { id: playerStore.table.public_url } })
        }
    }
}

const validatePassword = async (password: string) => {
    await playerStore._validateTablePassword(password).then((response) => {
        if (response.status === 200) {
            if (playerStore.table) {
                isOpenModalSetTablePassword.value = false;
                router.push({ name: 'room', params: { id: playerStore.table.public_url } })
            }
        } else {
            isOpenModalSetTablePassword.value = false;
            toast.error('Wrong Password')
        }
    })
}

const tablesFields = ref([
    'Table', 'Game', 'Players', 'Private', 'creator', 'status'
]);
const selectTable = ref<number>(-1);

const registerGuest = (username: string) => {
    userStore.registerGuest(username).then(() => {
        isOpenModalSetGuestUsername.value = false;
    })
}

const handleSelectTable = (index: number, table: Table) => {
    if (selectTable.value === index) {
        selectTable.value = -1
        playerStore.table = null;
    } else {
        selectTable.value = index;
        playerStore.table = table;
    }
}

watch(() => search.value,
    (char) => {
        filterTables.value = tables.value.filter(
            table => table.name.toLocaleLowerCase()
                .includes(char.toLocaleLowerCase()))
    })
</script>