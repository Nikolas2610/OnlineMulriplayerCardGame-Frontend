<template>
    <Flex
        class="border text-white fixed bottom-32 rounded-3xl h-14 bg-dark py-0 transition duration-1000 group cursor-pointer -translate-x-[640px] hover:-translate-x-[20px] z-[2147483639]"
        items="center" justify="center">
        <Flex class="border-r h-full px-6 pl-10" items="center" :gap="4">
            <!-- Play -->
            <Flex :justify="'center'" :items="'center'" class="hover:text-primary duration-300 transition"
                @click="$emit('newGame')">
                <VTooltip distance="22">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="w-6 h-6 focus:outline-none" viewBox="0 0 16 16">
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                    </svg>
                    <template #popper>
                        New Game
                    </template>
                </VTooltip>
            </Flex>
            <!-- Pause -->
            <Flex :justify="'center'" :items="'center'" class="hover:text-primary duration-300 transition">
                <button
                    @click="playerStore.table?.status === TableStatus.PLAYING || playerStore.table?.status === TableStatus.GAME_MASTER_EDIT ? $emit('updateTableGameStatus', TableStatus.PAUSE) : $emit('updateTableGameStatus', TableStatus.PLAYING)"
                    :disabled="playerStore.table?.status === TableStatus.FINISH || playerStore.table?.status === TableStatus.WAITING"
                    :class="playerStore.table?.status === TableStatus.FINISH || playerStore.table?.status === TableStatus.WAITING ? 'cursor-not-allowed opacity-50' : ''">
                    <VTooltip distance="22">
                        <svg v-if="playerStore.table?.status !== TableStatus.PAUSE" xmlns="http://www.w3.org/2000/svg"
                            width="16" height="16" fill="currentColor" class="w-6 h-6 focus:outline-none"
                            viewBox="0 0 16 16">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="w-6 h-6 focus:outline-none" viewBox="0 0 16 16">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                        </svg>
                        <template #popper>
                            Pause / Resume Game
                        </template>
                    </VTooltip>
                </button>
            </Flex>
            <!-- Edit Table / Hide from other players -->
            <Flex :justify="'center'" :items="'center'" class="hover:text-primary duration-300 transition">
                <button
                    @click="playerStore.table?.status === TableStatus.PLAYING || playerStore.table?.status === TableStatus.PAUSE ? $emit('updateTableGameStatus', TableStatus.GAME_MASTER_EDIT) : $emit('updateTableGameStatus', TableStatus.PLAYING)"
                    :disabled="playerStore.table?.status === TableStatus.FINISH || playerStore.table?.status === TableStatus.WAITING"
                    :class="playerStore.table?.status === TableStatus.FINISH || playerStore.table?.status === TableStatus.WAITING ? 'cursor-not-allowed opacity-50' : ''">
                    <VTooltip distance="22">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="w-6 h-6 focus:outline-none" viewBox="0 0 16 16">
                            <path
                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                        <template #popper>
                            Hide table from other players to edit the table
                        </template>
                    </VTooltip>
                </button>
            </Flex>
            <!-- Stop -->
            <Flex :justify="'center'" :items="'center'" class="hover:text-primary duration-300 transition"
                @click="$emit('stopGame')"
                :class="playerStore.table?.status === TableStatus.WAITING ? 'cursor-not-allowed opacity-50' : ''">
                <VTooltip distance="22">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="w-6 h-6 focus:outline-none" viewBox="0 0 16 16">
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z" />
                    </svg>
                    <template #popper>
                        End Game
                    </template>
                </VTooltip>
            </Flex>
            <!-- Find new players -->
            <Flex :justify="'center'" :items="'center'">
                <button :disabled="playerStore.table?.status !== TableStatus.FINISH"
                    @click="$emit('updateTableGameStatus', TableStatus.WAITING)"
                    class="hover:text-primary duration-300 transition"
                    :class="playerStore.table?.status !== TableStatus.FINISH ? 'cursor-not-allowed opacity-50' : ''">
                    <VTooltip distance="22">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="w-6 h-6 focus:outline-none" viewBox="0 0 16 16">
                            <path
                                d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                        </svg>
                        <template #popper>
                            Wait For New Players
                        </template>
                    </VTooltip>
                </button>
            </Flex>
            <!-- Leave -->
            <Flex :justify="'center'" :items="'center'" class="hover:text-primary duration-300 transition"
                @click="$emit('leaveGame')">
                <VTooltip distance="22">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="w-6 h-6 focus:outline-none" viewBox="0 0 16 16">
                        <path
                            d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                    </svg>
                    <template #popper>
                        Leave Game All Players
                    </template>
                </VTooltip>
            </Flex>
        </Flex>
        <Flex class="border-r h-full px-6" items="center" :gap="4">
            <!-- Previous Player -->
            <Flex :justify="'center'" :items="'center'" @click="$emit('setNextPlayer', false)"
                class="hover:text-primary duration-300 transition">
                <VTooltip distance="22">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="w-6 h-6 focus:outline-none" viewBox="0 0 16 16">
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.79-2.907L8.5 7.028V5.5a.5.5 0 0 0-.79-.407L5 7.028V5.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V8.972l2.71 1.935a.5.5 0 0 0 .79-.407V8.972l2.71 1.935A.5.5 0 0 0 12 10.5v-5a.5.5 0 0 0-.79-.407z" />
                    </svg>
                    <template #popper>
                        Previous Player
                    </template>
                </VTooltip>
            </Flex>
            <!-- Next Player -->
            <Flex :justify="'center'" :items="'center'" @click="$emit('setNextPlayer', true)"
                class="hover:text-primary duration-300 transition">
                <VTooltip distance="22">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="w-6 h-6 focus:outline-none" viewBox="0 0 16 16">
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.79 5.093A.5.5 0 0 0 4 5.5v5a.5.5 0 0 0 .79.407L7.5 8.972V10.5a.5.5 0 0 0 .79.407L11 8.972V10.5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-1 0v1.528L8.29 5.093a.5.5 0 0 0-.79.407v1.528L4.79 5.093z" />
                    </svg>
                    <template #popper>
                        Next Player
                    </template>
                </VTooltip>
            </Flex>
            <!-- Show all cards -->
            <Flex :justify="'center'" :items="'center'" class="hover:text-primary duration-300 transition"
                :class="playerStore.table?.status === TableStatus.PLAYING || playerStore.table?.status === TableStatus.PAUSE ? '' : 'cursor-not-allowed opacity-50'"
                @click="playerStore.table?.status === TableStatus.PLAYING || playerStore.table?.status === TableStatus.PAUSE ? $emit('showAllCards') : ''">
                <VTooltip distance="22">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="w-6 h-6 focus:outline-none" viewBox="0 0 16 16">
                        <path
                            d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                    </svg>
                    <template #popper>
                        Show all cards to players
                    </template>
                </VTooltip>
            </Flex>
            <!-- Shuffle click deck -->
            <Flex :justify="'center'" :items="'center'" class="hover:text-primary duration-300 transition"
                :class="isAvailableShuffleDeck() ? 'cursor-not-allowed opacity-50' : ''"
                @click="isAvailableShuffleDeck() ? '' : $emit('shuffleDeck')">
                <VTooltip distance="22">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="w-6 h-6 focus:outline-none" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z" />
                        <path
                            d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
                    </svg>
                    <template #popper>
                        Shuffle selected deck
                    </template>
                </VTooltip>
            </Flex>
            <!-- Undo Movement -->
            <Flex :justify="'center'" :items="'center'" class="hover:text-primary duration-300 transition"
                :class="playerStore.table?.status === TableStatus.PLAYING || playerStore.table?.status === TableStatus.GAME_MASTER_EDIT ? '' : 'cursor-not-allowed opacity-50'"
                @click="playerStore.table?.status === TableStatus.PLAYING || playerStore.table?.status === TableStatus.GAME_MASTER_EDIT ? $emit('historyMovement', HistoryMovement.UNDO) : ''">
                <VTooltip distance="22">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="w-6 h-6 focus:outline-none" viewBox="0 0 16 16">
                        <path
                            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16ZM7.729 5.055A.5.5 0 0 1 8 5.5v1.886l3.21-2.293A.5.5 0 0 1 12 5.5v5a.5.5 0 0 1-.79.407L8 8.614V10.5a.5.5 0 0 1-.79.407l-3.5-2.5a.5.5 0 0 1 0-.814l3.5-2.5a.5.5 0 0 1 .519-.038Z" />
                    </svg>
                    <template #popper>
                        Undo Card Movement
                    </template>
                </VTooltip>
            </Flex>
            <!-- Redo Movement -->
            <Flex :justify="'center'" :items="'center'" class="hover:text-primary duration-300 transition"
                :class="playerStore.table?.status === TableStatus.PLAYING || playerStore.table?.status === TableStatus.GAME_MASTER_EDIT ? '' : 'cursor-not-allowed opacity-50'"
                @click="playerStore.table?.status === TableStatus.PLAYING || playerStore.table?.status === TableStatus.GAME_MASTER_EDIT ? $emit('historyMovement', HistoryMovement.REDO) : ''">
                <VTooltip distance="22">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="w-6 h-6 focus:outline-none" viewBox="0 0 16 16">
                        <path
                            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16ZM4.79 5.093 8 7.386V5.5a.5.5 0 0 1 .79-.407l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 8 10.5V8.614l-3.21 2.293A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .79-.407Z" />
                    </svg>
                    <template #popper>
                        Redo Card Movement
                    </template>
                </VTooltip>
            </Flex>
        </Flex>
        <Flex class="border-r h-full px-6" items="center" :gap="4">
            <!-- Open User List -->
            <Flex :justify="'center'" :items="'center'" @click="$emit('openSettings', 2)"
                class="hover:text-primary duration-300 transition">
                <VTooltip distance="22">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="w-6 h-6 focus:outline-none" viewBox="0 0 16 16">
                        <path
                            d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    </svg>
                    <template #popper>
                        Open User List
                    </template>
                </VTooltip>
            </Flex>
        </Flex>
        <!-- Settings -->
        <Flex :justify="'center'" :items="'center'" class="px-8" @click="$emit('openSettings', 1)">
            <VTooltip distance="18">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 16 16"
                    class="hover:fill-primary transition duration-300 group-hover:animate-spin h-8 w-8 focus:outline-none">
                    <path
                        d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                    <path
                        d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                </svg>
                <template #popper>
                    Open Game Master Settings
                </template>
            </VTooltip>
        </Flex>
    </Flex>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/PlayerStore';
import { TableStatus } from '@/types/tables/TableStatus.enum';
import Flex from './wrappers/Flex.vue';
import { HistoryMovement } from '@/types/online-table/HIstoryMovement.enum'

const playerStore = usePlayerStore();
const emits = defineEmits([
    'openSettings',
    'stopGame',
    'leaveGame',
    'newGame',
    'updateTableGameStatus',
    'showAllCards',
    'setNextPlayer',
    'shuffleDeck',
    'historyMovement'
]);

const isAvailableShuffleDeck = () => {
    if (!playerStore.clickCardId) {
        return true;
    }

    const tableDeckId = playerStore.cards?.find(card => card.id === playerStore.clickCardId)?.table_deck.id;
    if (!tableDeckId || playerStore.table?.status !== TableStatus.PLAYING) {
        return true;
    }

    if (tableDeckId === playerStore.getJunkTableDeckId) {
        return false;
    }

    return !playerStore.dropZones.deck.some(deck => deck.tableDeckId === tableDeckId);
};

</script>