<template>
    <!-- Sidebar -->
    <Flex class="relative one-page w-full bg-dark">
        <div class="w-5/6 overflow-auto text-white">
            <!-- Title -->
            <div class="my-2">
                {{ playerStore.table?.name }} - {{ playerStore.table?.game?.name }} - ({{ route.params.id }})
            </div>

            <OnlineTable v-if="playerStore.table?.status === TableStatus.PLAYING" />
            <Flex v-else>
                <!-- Game Not started -->
                <div class="h-[200px] w-[1000px] bg-red-500 relative">
                    <CardSettings />
                </div>
            </Flex>
            <!-- <TestDrag v-else /> -->
        </div>

        <SideBarGame class="w-1/6" />
    </Flex>
    <!-- <TestDragItem /> -->



    <!-- Game Master Options -->
    <GameMasterMenu v-if="playerStore.gameMaster" @close="modalOpen = true" />
    <ModalFullPage :table-users="playerStore.table?.table_users" v-if="playerStore.gameMaster"
        :table="playerStore.table || undefined" :modal-open="modalOpen" @close-modal="modalOpen = false"
        @update-turn-table-users="playerStore._updateTurnTableUsers()"
        @update-role="(value, user) => playerStore._setRoleTableUser(value, user)"
        @update-status="(value, user) => playerStore._setStatusTableUser(value, user)"
        @update-team="(value, user) => playerStore._setTeamTableUser(value, user)" @stop-game="playerStore._stopGame()"
        @leave-game="playerStore._leaveGame()" @new-game="playerStore._newGame()" />
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
import CardSettings from '@/components/online-table/CardSettings.vue'

const route = useRoute();
const playerStore = usePlayerStore();
const modalOpen = ref(false)

playerStore.room = route.params.id.toString();
if (playerStore.table) {
    playerStore._joinTable(playerStore.room);
} else {
    router.push({ name: 'lobby' })
}

const showCardSettings = () => {

}

onBeforeMount(() => {
    playerStore.setGameMaster();
    // SOCKET EVENTS
    // update table users online
    socket.on('getTableUsers', (tableGame: Table) => {
        if (tableGame.public_url === playerStore.room && tableGame.table_users) {
            playerStore.table = tableGame;
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
        console.log('\x1b[31m%s\x1b[0m', 'getStartGameDetails');
        console.log(cards);

        if (response) {
            playerStore.table = response;
            extractTableDecksDetails();
        }
        if (cards) {
            playerStore.cards = cards;
        }
    })

    socket.on('exitUsersFromTable', () => {
        console.log('\x1b[33m%s\x1b[0m', 'exitUsersFromTable');
        playerStore.room = null;
        playerStore.gameMaster = false;
        playerStore.table = null;
        playerStore.cards = null;
        router.push({ name: 'lobby' })
    })

    socket.on('getUpdateCardPosition', (response: TableCard[]) => {
        console.log('\x1b[33m%s\x1b[0m', 'getUpdateCardPosition');
        if (response && playerStore.cards) {
            playerStore.cards = response;
            const max = playerStore.cards.reduce((maxValue, obj) => {
                return obj.z_index > maxValue ? obj.z_index : maxValue;
            }, 0);
            console.log("🚀 ~ file: RoomView.vue:118 ~ max ~ max:", max)
            playerStore.zIndex = max + 1;
        }
    });
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
    playerStore.room = null;
    playerStore.gameMaster = false;
    playerStore.cards = null;
    playerStore._leaveTable();
})
</script>
