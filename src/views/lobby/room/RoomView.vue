<template>
    <!-- Sidebar -->
    <Flex class="relative one-page w-full bg-dark">
        <div class="w-5/6 overflow-auto text-white">
            <!-- Title -->
            <div class="my-2">
                {{ playerStore.table?.name }} - {{ playerStore.table?.game?.name }} - ({{ route.params.id }})
            </div>

            <!-- Decks -->
            <Flex :justify="'center'">
                <div :class="`w-[${width}px] h-[150px]`" class="bg-secondary border">
                    Decks
                </div>
            </Flex>

            <!-- Table -->
            <Flex :justify="'center'">
                <div class="grid bg-dark" :class="`grid-cols-${playerStore.table?.game?.grid_cols} grid-rows-${playerStore.table?.game?.grid_rows} h-[${height}px] w-[${width}px]`
                ">
                    <div class="col-span-1" v-for="index in playerStore.table?.game?.grid_cols">
                        <div class="row-span-1 bg-primary border w-full" :class="`h-[${heightCell}px]`"
                            v-for="index in playerStore.table?.game?.grid_rows" @drop="(event) => dropHandler(event)"
                            @dragover="(event) => dragOverHandler(event)"></div>
                    </div>
                </div>
            </Flex>

            <!-- Player Deck -->
            <Flex :justify="'center'">
                <div :class="`w-[${width}px] h-[150px]`" class="bg-secondary border">
                    <Flex v-if="playerStore.cards">
                        <img :src="loadImage(card.card.image)" class="w-16 h-16" alt="" srcset="" :id="card.id.toString()"
                            draggable="true" @dragstart="(event) => startDrag(event)"
                            v-for="card in playerStore.cards.filter(card => card.table_deck?.id === playerStore.tableDeckId)">
                    </Flex>
                    <div v-else>No cards</div>
                </div>
            </Flex>
        </div>

        <SideBarGame class="w-1/6">
            <Flex :column="true" :justify="'between'" class="h-[96%]">
                <div>
                    <div class="text-2xl border-b border-primary pb-2">Users</div>
                    <GameUserItem v-for="(user, index) in playerStore.table?.table_users" :key="index" class="mt-3 w-2xl"
                        :game-master="playerStore.table?.game_master?.id === user.id">
                        <Flex :items="'center'" :justify="playerStore.cards ? 'center' : 'between'" :gap="2">
                            <div class="w-3/6">{{ user.user?.username }}</div>
                            <Flex :gap="2" class="w-2/6" v-if="playerStore.cards">
                                <img src="@/assets/icons/sidebar/cards.svg" alt="cards" srcset="">
                                <div>{{ playerStore.cards.filter(card => card.table_deck.id ===
                                    playerStore.tableDeckId).length }}</div>
                            </Flex>
                            <div class="w-1/6 cursor-pointer group" @click="toggleOpenUserCard(user.id)" v-if="(user.team?.name || user.role?.name || user.status?.name) || playerStore.cards">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="group-hover:text-primary duration-300 transition"
                                    :class="isOpenUserCard(user.id) ? 'rotate-0' : 'rotate-180'" viewBox="0 0 16 16">
                                    <path
                                        d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                </svg>
                            </div>
                        </Flex>
                        <div class="p-2 mt-2 shadow-2xl rounded-xl border-dashed border" v-if="isOpenUserCard(user.id) && 
                        (user.team?.name || user.role?.name || user.status?.name)">
                            <Flex v-if="user.team?.name">
                                <div class="w-2/6">Team:</div>
                                <div>{{ user.team?.name ? user.team?.name : 'none' }}</div>
                            </Flex>
                            <Flex  v-if="user.role?.name">
                                <div class="w-2/6">Role:</div>
                                <div>{{ user.role?.name ? user.role?.name : 'none' }}</div>
                            </Flex>
                            <Flex  v-if="user.status?.name">
                                <div class="w-2/6">Status:</div>
                                <div>{{ user.status?.name ? user.status?.name : 'none' }}</div>
                            </Flex>
                        </div>
                        <div v-if="playerStore.cards && isOpenUserCard(user.id)" class="mt-4">
                            <Flex :gap="2" class="flex-wrap" :justify="'center'">
                                <img :src="card.hidden ? backCardImage : loadImage(card.card.image)" alt="" srcset=""
                                    v-for="(card, index) in playerStore.cards.filter(card => card.table_deck?.user?.id === user.user.id)"
                                    :key="`user-card-${index}`" class="w-10 h-12">
                            </Flex>
                        </div>
                    </GameUserItem>
                </div>
                <Flex :justify="'center'">
                    <RouterLink :to="{ name: 'lobby' }">
                        <BackButton :title="'Leave Game'" />
                    </RouterLink>
                </Flex>
            </Flex>
        </SideBarGame>


    </Flex>
    <TestDrag v-if="false" />
    <!-- <TestDragItem /> -->



    <!-- Game Master Options -->
    <GameMasterMenu v-if="playerStore.gameMaster" @close="modalOpen = true" />
    <ModalFullPage :table-users="playerStore.table?.table_users" v-if="playerStore.gameMaster"
        :table="playerStore.table || undefined" :modal-open="modalOpen" @close-modal="modalOpen = false"
        @update-turn-table-users="playerStore._updateTurnTableUsers()"
        @update-role="(value, user) => playerStore._setRoleTableUser(value, user)"
        @update-status="(value, user) => playerStore._setStatusTableUser(value, user)"
        @update-team="(value, user) => playerStore._setTeamTableUser(value, user)" @start-game="playerStore._startGame()"
        @leave-game="playerStore._leaveGame()" />
</template>

<script setup lang="ts">
import socket from '@/plugins/socket';
import router from '@/router';
import { usePlayerStore } from '@/stores/PlayerStore';
import { onUnmounted, onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import GameMasterMenu from '@/components/GameMasterMenu.vue';
import ModalFullPage from '@/components/modals/ModalFullPage.vue';
import SideBarGame from '@/components/sidebar/SidebarGame.vue';
import GameUserItem from '@/components/sidebar/GameUserItem.vue';
import BackButton from '@/components/buttons/BackButton.vue';
import Flex from '@/components/wrappers/Flex.vue';
import type { Table } from '@/types/tables/Table';
import TestDrag from '@/components/TestDrag.vue'
import type { TableUsers } from '@/types/lobby/TableUsers';
import type { TableCard } from '@/types/tables/TableCard'
import backCardImage from '@/assets/images/close-card.png'


interface PlayerUser {
    username: string | null,
    id: number,
}

const openUserCards = ref<number[]>([]);

const isOpenUserCard = (id: number) => {
    return openUserCards.value.indexOf(id) !== -1;
}

const toggleOpenUserCard = (id: number) => {
    openUserCards.value.indexOf(id) !== -1
        ? openUserCards.value = openUserCards.value.filter(userId => userId !== id)
        : openUserCards.value.push(id);
}

// DROP TEST
const draggedItem = ref(null);
const dragOverHandler = (event: any) => {
    console.log('\x1b[32m%s\x1b[0m', 'dragOverHandler');
    event.preventDefault();
}

const dropHandler = (event: any) => {
    console.log('\x1b[32m%s\x1b[0m', 'dropHandler');
    event.preventDefault();
    const droppedItem = event.target;
    // do something with the droppedItem
}

const startDrag = (event: any) => {
    console.log('\x1b[32m%s\x1b[0m', 'startDrag');
    draggedItem.value = event.target;
}

const test = (ev: any) => {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log(ev);

}

function drag(ev: any) {
    console.log('\x1b[31m%s\x1b[0m', '2');
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev: any) {
    console.log('\x1b[33m%s\x1b[0m', '3');
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

// END DROP TEST

const route = useRoute();
const playerStore = usePlayerStore();
const usersOnline = ref<PlayerUser[]>([]);
const modalOpen = ref(false)
const height = ref(800);
const width = ref(1200);
const heightCell = ref(800)
if (playerStore.table?.game) {
    heightCell.value = parseFloat((height.value / playerStore.table?.game.grid_rows).toFixed(1));
}


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
            // ({ user: { username, id } }) => ({ username, id })
            usersOnline.value = tableGame.table_users.map(user => {
                return { username: user.user.username, id: user.user.id }
            });
        }
    })

    // update table users turn
    socket.on('getTurnTableUsers', (response: TableUsers[]) => {
        if (playerStore.table && response) {
            playerStore.table.table_users = response;

            usersOnline.value = playerStore.table.table_users.map(user => {
                return { username: user.user.username, id: user.user.id }
            });
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
        console.log(response);
        console.log(cards);

        if (response) {
            playerStore.table = response;
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
})
onUnmounted(() => {
    playerStore.room = null;
    playerStore.gameMaster = false;
    playerStore.cards = null;
    playerStore._leaveTable();
})

// These function is to load the image and from the upload images and from the fake data images
const loadImage = (image: string) => {
    if (image.substring(0, 4) === 'http') {
        return image;
    } else {
        return import.meta.env.VITE_BACKEND_IMAGE_URL + image;
    }
}

watch(() => playerStore.table?.game?.grid_rows,
    () => {
        if (playerStore.table?.game) {
            heightCell.value = parseFloat((height.value / playerStore.table?.game.grid_rows).toFixed(1));
        }
    })

</script>
