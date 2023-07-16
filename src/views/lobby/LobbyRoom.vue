<template>
    <Container v-if="width > gameWidth && height > gameHeight">
        <!-- Title -->
        <Flex justify="between" items="end" class="mb-4">
            <MyTitle>Lobby</MyTitle>
            <button class="bg-black text-white h-12 px-4 rounded-xl hover:bg-primary transition duration-300"
                v-if="userStore.user.email === null" @click="isOpenModalSetGuestUsername = true">{{ userStore.user.username
                    ? 'Change Nickname' : 'Add Nickname' }}</button>
        </Flex>

        <!-- Box resume game for the leavers -->
        <Flex v-if="playerStore.leaverPlayer.table" justify="between" items="center"
            class="p-4 bg-dark text-white rounded-xl mb-6 text-lg">
            <div>
                Previous game: <span class="text-primary font-bold">{{ playerStore.leaverPlayer.table.name }}</span>
            </div>
            <div>
                <PrimaryButton title="Resume Game" @click="joinRoom(playerStore.leaverPlayer.table as Table)"
                    v-if="playerStore.leaverPlayer && playerStore.leaverPlayer.table" />
            </div>
        </Flex>

        <!-- Users online -->
        <Flex justify="center" class="mt-3 p-4 text-xl" v-if="usersOnline" :gap="8">
            <Flex items="center" :gap="2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-people text-primary h-8 w-8 "
                    viewBox="0 0 16 16">
                    <path
                        d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                </svg>
                <div>
                    Users Online: <span class="text-primary">{{ usersOnline.countOnlineUsers }}</span>
                </div>
            </Flex>
            <Flex items="center" :gap="2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-people text-[#cc6514] h-8 w-8 "
                    viewBox="0 0 16 16">
                    <path
                        d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                </svg>
                <div>
                    Users in game: <span class="text-[#cc6514]">{{ usersOnline.countInRoomUsers }}</span>
                </div>
            </Flex>
        </Flex>

        <!-- Search Game -->
        <GridCol :all="2" class="my-3 px-2">
            <GridColItem :all="1">
                <InputField :input="search" :placeholder="'Search a Table..'" @change="(value) => search = value" />
            </GridColItem>
            <!-- Table Actions -->
            <GridColItem :all="1">
                <Flex justify="end" :gap="2">
                    <PrimaryButton :title="'Create Table'" @click="openCreateTableModal()"
                        v-if="userStore.user.role !== Roles.guest"></PrimaryButton>
                </Flex>
            </GridColItem>
        </GridCol>

        <!-- Online tables -->
        <DarkTable :table-headers="tablesFields" v-if="filterTables.length > 0" class="max-h-[490px] overflow-x-auto"
            :actions="true">
            <DarkTableRow v-for="(table, i) in filterTables" :key="`lobby-row-${table.id}`"
                class="cursor-pointer transition duration-1000" @click="handleSelectTable(i, table)"
                :class="[selectTable === i ? 'bg-gray-700' : '', table.creator?.id === userStore.user.id ? 'bg-[#222]' : '']"
                @mouseover="hoverItem = i" @mouseleave="hoverItem = -1">
                <DarkTableCell class="w-2/12">
                    {{ table.name }}
                </DarkTableCell>
                <DarkTableCell class="w-2/12">
                    {{ table.game?.name }}
                </DarkTableCell>
                <DarkTableCell class="w-1/12">
                    {{ table.table_users?.length ? table.table_users.length : 0 }} / {{ table.game?.max_players }}
                </DarkTableCell>
                <DarkTableCell class="w-1/12">
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
                <DarkTableCell class="w-2/12" :class="table.creator?.id === userStore.user.id ? 'text-primary' : ''">
                    {{ table.creator?.username }}
                </DarkTableCell>
                <DarkTableCell class="w-2/12 capitalize" :class="[
                    table.status === TableStatus.WAITING ? 'text-blue-500' : '',
                    table.status === TableStatus.PLAYING ? 'text-primary' : '',
                    table.status === TableStatus.PLAYER_DISCONNECTED || table.status === TableStatus.PLAYER_LEAVE ? 'text-red-500' : '',
                    table.status === TableStatus.PAUSE || table.status === TableStatus.GAME_MASTER_EDIT ? 'text-orange-500' : '',
                ]">
                    {{ (StatusTable.find(item => item.id === table.status)?.name) || 'Unknown' }}
                </DarkTableCell>
                <DarkTableCell class="w-2/2">
                    <Flex :gap="2" class="w-full" justify="center">
                        <VTooltip v-if="table.status === TableStatus.WAITING">
                            <JoinButton @click="joinRoom(table)" />
                            <template #popper>
                                Join Table
                            </template>
                        </VTooltip>
                        <VTooltip v-if="hoverItem === i && table.creator?.id === userStore.user.id && table.status === TableStatus.WAITING">
                            <RemoveButton @click="playerStore._removeTable(table?.id)" />
                            <template #popper>
                                Remove Table
                            </template>
                        </VTooltip>
                    </Flex>
                </DarkTableCell>
            </DarkTableRow>
        </DarkTable>

        <Alert v-else class="mt-10">
            No available tables to join. Create a table to start a game!
        </Alert>
    </Container>

    <!-- Message for smaller devices -->
    <Container v-else>
        <Flex class="bg-red-500 p-4" justify="center" items="center">
            The game is supported on desktop computers
        </Flex>
    </Container>

    <!-- Modals -->
    <CreateTableModal :is-modal-open="createTableModal" @close-modal="() => createTableModal = false"
        v-if="userStore.user.role !== Roles.guest" />
    <ModalSetGuestUsername :is-modal-open="isOpenModalSetGuestUsername"
        :username="userStore.user.username ? userStore.user.username : ''"
        @close-modal="isOpenModalSetGuestUsername = false"
        @register-guest="(username: string) => registerGuest(username)" />
    <ModalSetPasswordTable :is-modal-open="isOpenModalSetTablePassword" @close-modal="isOpenModalSetTablePassword = false"
        @set-password-table="(password: string) => validatePassword(password)" />

    <Footer v-if="userStore.isGuest" />
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
import { useWindowSize } from '@vueuse/core'
import MyTitle from '@/components/MyTitle.vue';
import type { CountUsers } from '@/types/online-table/CountUsers'
import { setOnlineSocketUser } from '@/utils/sockets/helpers';
import { useTableStore } from '@/stores/TableStore';
import { StatusTable } from '@/utils/StatusTable';
import Footer from '@/components/Footer.vue';
import JoinButton from '@/components/buttons/JoinButton.vue'
import Alert from '@/components/ui/Alert.vue';

const { width, height } = useWindowSize();
const gameHeight = ref(parseInt(import.meta.env.VITE_GAME_HEIGHT));
const gameWidth = ref(parseInt(import.meta.env.VITE_GAME_WIDTH));

const isOpenModalSetGuestUsername = ref(false);
const isOpenModalSetTablePassword = ref(false);
const hoverItem = ref(0);

const router = useRouter()
const userStore = useUserStore();
const tables = ref<Table[]>([]);
const filterTables = ref<Table[]>([]);
const toast = useToast();
const playerStore = usePlayerStore();
const tableStore = useTableStore();
const search = ref('');
const createTableModal = ref(false);
const usersOnline = ref<CountUsers>({
    countInRoomUsers: 0,
    countOnlineUsers: 0
})

onBeforeMount(() => {
    if (!userStore.user.id) {
        isOpenModalSetGuestUsername.value = true;
    }
    // Get active tables
    socket.emit('getAllOnlineTable', {}, (response: { tables: Table[] | [], countUsers: CountUsers }) => {
        tables.value = filterTables.value = response.tables ?? [];
        usersOnline.value = response.countUsers;
    });

    // Load the previous game of the leaver
    socket.on('getLastGame', (table: Table) => {
        playerStore.leaverPlayer.table = playerStore.table = { ...table };
    })

    // Get online users
    socket.on('getUsersOnline', (countUsers: CountUsers) => {
        usersOnline.value = countUsers;
    })

    // Add a new table - Update list
    socket.on('getOnlineTable', (response: Table) => {
        response.table_users = [];
        tables.value.unshift(response);
    });
    // Remove table - Update list
    socket.on('getRemoveTable', (response) => {
        tables.value = filterTables.value = tables.value.filter(table => table.id !== response);
    })
    // Update players to the tables
    socket.on('getTableUsers', (tableGame: Table) => {
        const index = tables.value.map(table => table.id).indexOf(tableGame.id);

        if (index !== -1) {
            tables.value[index].table_users = tableGame.table_users ?? null;
        }
    })

    // Update table status
    socket.on('getUpdateTable', (tableGame: Table) => {
        // Find the table in the table list if exists
        const tableIndex = tables.value.map(table => table.id).indexOf(tableGame?.id);

        if (tableIndex === -1) {
            // If the table not exists to the tables add it to the list
            tables.value.push(tableGame);
        } else {
            if (tableGame.status === TableStatus.FINISH) {
                // Remove table if is finish
                tables.value.splice(tableIndex, 1);
            } else {
                // Update table
                tables.value[tableIndex] = tableGame;
            }
        }


        // Insert tables to the filter tables
        filterTables.value = tables.value.filter(
            table => table.name.toLocaleLowerCase()
                .includes(search.value.toLocaleLowerCase()))

    })
})

const joinRoom = (table: Table) => {
    playerStore.table = table;

    if (!playerStore.table) {
        return;
    }

    if (!userStore.user.id) {
        isOpenModalSetGuestUsername.value = true;
        return;
    }

    if (playerStore.table.private) {
        isOpenModalSetTablePassword.value = true;
        return;
    }

    if (!playerStore.table.game?.max_players || !playerStore.table?.table_users) {
        return;
    }

    if (playerStore.table?.table_users?.length < playerStore.table.game?.max_players) {
        playerStore.leaverPlayer.table = null;
        router.push({ name: 'room', params: { id: playerStore.table.public_url } });
        return;
    }

    if (playerStore.leaverPlayer?.table && table?.table_users) {
        const user = table?.table_users.find(user => user.user.id === userStore.user.id);
        if (user) {
            playerStore.leaverPlayer.table = null;
            router.push({ name: 'room', params: { id: playerStore.table.public_url } });
            return;
        }
    }

    toast.error('The table is full');
};

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

const openCreateTableModal = () => {
    if (tableStore.games.length === 0) {
        toast.warning('You have to create a game first');
    } else {
        createTableModal.value = true
    }
}

const tablesFields = ref([
    'Table', 'Game', 'Players', 'Private', 'creator', 'status'
]);
const selectTable = ref<number>(-1);

const registerGuest = (username: string) => {
    userStore.registerGuest(username).then(() => {
        isOpenModalSetGuestUsername.value = false;
        setOnlineSocketUser(userStore.user.id);
    })
}

const handleSelectTable = (index: number, table: Table) => {
    if (selectTable.value === index) {
        selectTable.value = -1
        playerStore.table = null;
    } else {
        selectTable.value = index;
        playerStore.table = { ...table };
    }
}

watch(() => search.value,
    (char) => {
        filterTables.value = tables.value.filter(
            table => table.name.toLocaleLowerCase()
                .includes(char.toLocaleLowerCase()))
    })
</script>