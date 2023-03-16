<template>
    <!-- Sidebar -->
    <Flex class="relative one-page w-full bg-dark">
        <div class="w-5/6 overflow-auto text-white">
            <!-- Table playing status -->
            <OnlineTable v-if="playerStore.table?.status === TableStatus.PLAYING" />
            <!-- Table waiting status -->
            <Flex v-else class="h-full bg-dark" :items="'center'" :justify="'center'" :column="true">
                <div class="rounded-2xl bg-primary px-12 py-6  text-4xl italic">
                    {{ playerStore.table?.status === TableStatus.PAUSE ? 'Game Paused' : 'Game not started yet' }}
                </div>
                <div class="mt-6 text-xl">
                    {{ playerStore.table?.status === TableStatus.PAUSE ? '...waiting from Game Master to resume the game' :
                        '...waiting from Game Master to start the game' }}
                </div>
            </Flex>
        </div>

        <SideBarGame class="w-1/6 overflow-x-auto" />
    </Flex>

    <!-- Game Master Options -->
    <GameMasterMenu v-if="playerStore.gameMaster"
        @open-settings="(value) => { modalFullPageMenuTabProp = value; modalOpen = true; }"
        @stop-game="playerStore._stopGame()" @leave-game="playerStore._leaveGame()" @new-game="playerStore._newGame()"
        @update-table-game-status="(status) => playerStore._updateTableGameStatus(status)"
        @show-all-cards="playerStore._showAllCards()"
        />
    <ModalFullPage :table-users="playerStore.table?.table_users" v-if="playerStore.gameMaster"
        :table-status="{ status: playerStore.table?.status }" :table="playerStore.table || undefined"
        :modal-open="modalOpen" @close-modal="modalOpen = false"
        @update-turn-table-users="playerStore._updateTurnTableUsers()"
        @update-role="(value, user) => playerStore._setRoleTableUser(value, user)"
        @update-status="(value, user) => playerStore._setStatusTableUser(value, user)"
        @update-team="(value, user) => playerStore._setTeamTableUser(value, user)" @stop-game="playerStore._stopGame()"
        @leave-game="playerStore._leaveGame()" @new-game="playerStore._newGame()"
        @update-table-game-status="(status) => playerStore._updateTableGameStatus(status)"
        @show-all-cards="playerStore._showAllCards()" :menu-tab="modalFullPageMenuTabProp"
        @remove-player="(userId) => playerStore._removePlayer(userId)" />
    <ModalViewAllCards :is-modal-open="modalOpenViewAllCards" :cards="playerStore.cards"
        :table-decks="playerStore.table?.table_decks" @close-modal="modalOpenViewAllCards = false"
        v-if="playerStore.cards" />
</template>

<script setup lang="ts">
import socket from '@/plugins/socket';
import router from '@/router';
import { usePlayerStore } from '@/stores/PlayerStore';
import { onUnmounted, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import GameMasterMenu from '@/components/GameMasterMenu.vue';
import ModalFullPage from '@/components/modals/ModalFullPage.vue';
import SideBarGame from '@/components/sidebar/SidebarGame.vue';
import Flex from '@/components/wrappers/Flex.vue';
import type { Table } from '@/types/tables/Table';
import type { TableUsers } from '@/types/lobby/TableUsers';
import type { TableCard } from '@/types/tables/TableCard'
import OnlineTable from '@/components/online-table/OnlineTable.vue';
import { TableDeckType } from '@/types/tables/TableDeckType';
import { TableStatus } from '@/types/tables/TableStatus.enum';
import ModalViewAllCards from '@/components/modals/ModalViewAllCards.vue';
import { useUserStore } from '@/stores/UserStore';
import { useToast } from 'vue-toastification';

const route = useRoute();
const playerStore = usePlayerStore();
const userStore = useUserStore();
const modalOpen = ref(false)
const modalOpenViewAllCards = ref(false);
const modalFullPageMenuTabProp = ref(1);
const toast = useToast();

playerStore.room = route.params.id.toString();
if (playerStore.table) {
    playerStore._joinTable(playerStore.room);
} else {
    router.push({ name: 'lobby' })
}

onBeforeMount(() => {
    playerStore.setGameMaster();
    // SOCKET EVENTS
    // update table users online
    socket.on('getTableUsers', (tableGame: Table) => {
        if (tableGame.public_url === playerStore.room && tableGame.table_users) {
            playerStore.table = tableGame;
            const user = playerStore.table.table_users?.find(user => user.user.id === userStore.user.id);
            if (!user) {
                router.push({ name: 'lobby' });
            }
        }
    })

    // update table users turn
    socket.on('getTurnTableUsers', (response: TableUsers[]) => {
        if (playerStore.table && response) {
            playerStore.table.table_users = response;
        }
    })

    socket.on('getUpdateTableUser', (response: TableUsers) => {
        if (response) {
            const index = playerStore.table?.table_users?.map(user => user.id).indexOf(response.id);
            if (playerStore.table && index !== undefined) {
                playerStore.table.table_users![index] = response;
            }
        }
    })

    socket.on('getStartGameDetails', (response: Table, cards: TableCard[]) => {
        if (response) {
            playerStore.table = response;
            extractTableDecksDetails();
            if (playerStore.deckReferences.junk) {
                playerStore.dropZones.junk[0].element = playerStore.deckReferences.junk
                playerStore.dropZones.user[0].element = playerStore.deckReferences.user
                playerStore.dropZones.table[0].element = playerStore.deckReferences.table
            }
        }
        if (cards) {
            playerStore.cards = cards;
        }
    })

    socket.on('exitUsersFromTable', () => {
        playerStore.room = null;
        playerStore.gameMaster = false;
        playerStore.table = null;
        playerStore.cards = null;
        router.push({ name: 'lobby' })
    })

    socket.on('getUpdateCardPosition', (response: TableCard[]) => {
        if (response && playerStore.cards) {
            playerStore.cards = response;
            const max = playerStore.cards.reduce((maxValue, obj) => {
                return obj.z_index > maxValue ? obj.z_index : maxValue;
            }, 0);
            playerStore.zIndex = max + 1;
        }
    });

    socket.on('getTableGameStatus', (tableGame: Table) => {
        if (tableGame) {
            playerStore.table = tableGame;
        }
    })

    socket.on('getShowAllCards', (response: boolean) => {
        if (response) {
            modalOpenViewAllCards.value = response;
        }
    })
})

const extractTableDecksDetails = () => {
    playerStore.resetDropZones();
    playerStore.table?.table_decks?.forEach(deck => {
        switch (deck.type) {
            case TableDeckType.DECK:
                playerStore.dropZones.deck.push({ tableDeckId: deck.id, element: null })
                break;
            case TableDeckType.JUNK:
                playerStore.dropZones.junk.push({ tableDeckId: deck.id, element: null })
                break;
            case TableDeckType.TABLE:
                playerStore.dropZones.table.push({ tableDeckId: deck.id, element: null })
                break;
            case TableDeckType.USER:
                if (deck.id === playerStore.getExistPlayerTableDeckId) {
                    playerStore.dropZones.user.push({ tableDeckId: deck.id, element: null })
                }
                break;
            default:
                break;
        }
    })
}


onUnmounted(() => {
    // TODO: Solution to this
    playerStore.room = null;
    playerStore.gameMaster = false;
    playerStore.cards = null;
    playerStore._leaveTable();
})
</script>
