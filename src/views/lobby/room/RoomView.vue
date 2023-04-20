<template>
    <!-- Sidebar -->
    <Flex class="relative one-page w-full bg-dark">
        <div class="w-5/6 overflow-auto text-white relative">
            <!-- Table playing status -->
            <OnlineTable v-if="playerStore.table?.status === TableStatus.PLAYING
                || (playerStore.gameMaster && playerStore.table?.status === TableStatus.GAME_MASTER_EDIT)" />
            <!-- Table waiting status -->
            <Flex v-for="{ status, title, message } in tableStatusMessage" :key="status" items="center" justify="center"
                v-else>
                <TableStatusMessage :title="title" :message="message" v-if="playerStore.table?.status === status" />
            </Flex>
            <RoomChat />
        </div>

        <SideBarGame class="w-1/6 overflow-x-auto" />
    </Flex>

    <!-- Game Master Options -->
    <GameMasterMenu v-if="playerStore.gameMaster"
        @open-settings="(value) => { modalFullPageMenuTabProp = value; modalOpen = true; }"
        @stop-game="playerStore._stopGame()" @leave-game="playerStore._leaveGame()" @new-game="playerStore._newGame()"
        @update-table-game-status="(status) => playerStore._updateTableGameStatus(status)"
        @show-all-cards="playerStore._showAllCards()"
        @set-next-player="(nextPlayer: boolean) => playerStore._setNextPlayer(nextPlayer)"
        @shuffle-deck="playerStore._shuffleDeck()"
        @history-movement="(movement) => playerStore.historyMovement(movement)" />
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
        @remove-player="(userId) => playerStore._removePlayer(userId)"
        @set-next-player="(nextPlayer: boolean) => playerStore._setNextPlayer(nextPlayer)" />
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
import { POSITION, useToast } from 'vue-toastification';
import RoomChat from '@/components/online-table/chat/RoomChat.vue';
import TableStatusMessage from '@/components/online-table/TableStatusMessage.vue';
import { useRankStore } from '@/stores/RankStore';
import type { Rank } from '@/types/online-table/Rank';

const route = useRoute();
const playerStore = usePlayerStore();
const userStore = useUserStore();
const modalOpen = ref(false)
const modalOpenViewAllCards = ref(false);
const modalFullPageMenuTabProp = ref(1);
const toast = useToast();
const rankStore = useRankStore();

playerStore.room = route.params.id.toString();
if (playerStore.table) {
    playerStore._joinTable(playerStore.room);
} else {
    router.push({ name: 'lobby' })
}
const webSocketsTableEvents = ref([
    'getTurnTableUsers',
    'getUpdateTableUser',
    'getStartGameDetails',
    'exitUsersFromTable',
    'getTableGameStatus',
    'getShowAllCards',
    'getUpdateCard',
    'getShuffleDeck',
    'getUpdateRankRow',
]);

const initializeRankStore = () => {
    // Initialize game store data
    rankStore.room = playerStore.room ?? '';
    rankStore.tableId = playerStore.table?.id ?? null

    rankStore.addTableUsers(playerStore.table?.table_users ?? []);
}

onBeforeMount(() => {
    // Initialize game master of the room
    playerStore.setGameMaster();

    // SOCKET EVENTS
    // update table users online
    socket.on('getTableUsers', (tableGame: Table) => {
        if (tableGame.public_url === playerStore.room && tableGame.table_users) {
            playerStore.table = tableGame;
            const user = playerStore.table.table_users?.find(user => user.user.id === userStore.user.id);
            if (!user) {
                toast.info(`Player ${userStore.user.username} has remove from Game Master`)
                router.push({ name: 'lobby' });
            }
        }
    })

    // update table users turn
    socket.on('getTurnTableUsers', (response: TableUsers[]) => {
        if (playerStore.table && response) {
            playerStore.table.table_users = response;
        }
        const user = playerStore.table?.table_users?.find(user => user.playing === true);
        if (user) {
            toast.info(`Player ${user.user.username} is playing`, {
                position: POSITION.TOP_CENTER, timeout: 3000
            });
        }
    })

    socket.on('getUpdateTableUser', (response: TableUsers) => {
        if (response) {
            const index = playerStore.table?.table_users?.map(user => user.id).indexOf(response.id);
            if (playerStore.table && index !== undefined) {
                if (
                    (!playerStore.table.table_users![index]?.status && response?.status)
                    || (playerStore.table.table_users![index].status?.id !== response?.status?.id)) {
                    const message = response.status?.name ? `${response.user.username} update his status to "${response.status?.name}"`
                        : `${response.user.username} has remove his status`
                    toast.info(message);
                }
                playerStore.table.table_users![index] = response;
            }
        }
    })

    socket.on('getStartGameDetails', (response: Table, cards: TableCard[]) => {
        if (response) {
            // Catch previous status of the table
            const isPreviousWaitingTable = playerStore.table?.status === TableStatus.WAITING;
            playerStore.table = response;
            extractTableDecksDetails();

            // Catch the new status of the table
            const isPlayingTable = playerStore.table?.status === TableStatus.PLAYING;

            // If the table is from waiting to playing (status) update the rank table with new players
            if (isPlayingTable && isPreviousWaitingTable) {
                initializeRankStore();
            }

            // Get the elements of the decks
            if (playerStore.deckReferences.junk) {
                [playerStore.dropZones.junk[0].element, playerStore.dropZones.user[0].element, playerStore.dropZones.table[0].element] = [
                    playerStore.deckReferences.junk,
                    playerStore.deckReferences.user,
                    playerStore.deckReferences.table,
                ];
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
        toast.info('Game master has remove you from the table')
        router.push({ name: 'lobby' })
    })

    socket.on('getTableGameStatus', (tableGame: Table) => {
        if (tableGame) {
            playerStore.table = tableGame;
            if (tableGame.status === TableStatus.PAUSE) {
                toast.info('Game has paused')
            }
            if (tableGame.status === TableStatus.PLAYING) {
                toast.info('Game has start')
            }
            if (tableGame.status === TableStatus.GAME_MASTER_EDIT) {
                toast.info('The game master is preparing the table')
            }
            if (tableGame.status === TableStatus.FINISH) {
                toast.info('Game has end')
            }
        }
    })

    socket.on('getShowAllCards', (response: boolean) => {
        if (response) {
            modalOpenViewAllCards.value = response;
        }
    })

    socket.on('getUpdateCard', (response: TableCard) => {
        if (response) {
            console.log('get Update Card');

            playerStore.zIndex = response.z_index + 1;
            updateCard(response);
        }
    });

    socket.on('getShuffleDeck', (response: TableCard[], tableDeckId: number) => {
        if (response) {
            response.forEach(card => {
                updateCard(card);
            })
            const deckName = playerStore.table?.table_decks?.find(d => d.id === tableDeckId)?.deck?.name
            toast.info(`Game Master has shuffle the deck "${deckName}"`)
        }
    });

    // Update rank table
    socket.on('getUpdateRankRow', (response: Rank[] | null, row: number) => {
        if (!response) {
            // Delete table row
            const index = rankStore.rankPoints.findIndex(rankRow => rankRow.some(rank => rank.row === row))
            rankStore.rankPoints = rankStore.rankPoints.filter((row, i) => i !== index);
        } else {
            if (row === rankStore.nextRow) {
                // Add new table row
                rankStore.rankPoints.push(response);
            } else {
                // Update table row
                const index = rankStore.rankPoints.findIndex(rankRow => rankRow.some(rank => rank.row === row))
                rankStore.rankPoints[index] = response;
            }
        }

        // Show to the user notification for the rank
        playerStore.rank.notification = true;
    })
});

const updateCard = (cardResponse: TableCard) => {
    const cardIndex = playerStore.cards?.findIndex((card) => card.id === cardResponse.id);
    if (cardIndex && cardIndex > -1 && playerStore.cards) {
        playerStore.updateHistory(playerStore.cards[cardIndex], cardResponse);
        playerStore.cards?.splice(cardIndex, 1); // Remove the card from the array
        playerStore.cards?.push(cardResponse); // Add the updated card to the array
        playerStore.removeRedoHistoryMovement();
    }
}

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

const tableStatusMessage = ref([
    { status: TableStatus.WAITING, title: 'Game not started yet', message: '...waiting from Game Master to start the game' },
    { status: TableStatus.PAUSE, title: 'Game Paused', message: '...waiting from Game Master to resume the game' },
    { status: TableStatus.GAME_MASTER_EDIT, title: 'Game edit from Game Master', message: '..waiting from Game Master to finish with the configure of the table' },
    { status: TableStatus.FINISH, title: 'Game has ended', message: '...waiting from Game Master to start the game' },
])

onUnmounted(() => {
    // TODO: Solution to this
    playerStore.room = null;
    playerStore.gameMaster = false;
    playerStore.cards = null;
    playerStore.refHistory = [];
    playerStore.refHistoryRedo = [];
    playerStore._leaveTable();
    webSocketsTableEvents.value.forEach(event => {
        socket.off(event);
    })
})
</script>
