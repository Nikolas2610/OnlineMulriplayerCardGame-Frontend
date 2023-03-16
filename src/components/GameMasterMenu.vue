<template>
    <Flex
        class="border text-white fixed bottom-10 rounded-3xl h-14 bg-dark py-0 transition duration-1000 group cursor-pointer -translate-x-[450px] hover:-translate-x-[20px]"
        items="center" justify="center">
        <Flex class="border-r h-full px-6 pl-10" items="center" :gap="4">
            <!-- Play -->
            <Flex :justify="'center'" :items="'center'" class="hover:text-primary duration-300 transition"
                @click="$emit('newGame')">
                <VTooltip distance="22">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="w-6 h-6 focus:outline-none" viewBox="0 0 16 16">
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                    </svg>
                    <template #popper>
                        New Game
                    </template>
                </VTooltip>
            </Flex>
            <!-- Pause -->
            <Flex :justify="'center'" :items="'center'" class="hover:text-primary duration-300 transition">
                <button
                    @click="playerStore.table?.status === TableStatus.PLAYING ? $emit('updateTableGameStatus', TableStatus.PAUSE) : $emit('updateTableGameStatus', TableStatus.PLAYING)"
                    :disabled="playerStore.table?.status === TableStatus.FINISH || playerStore.table?.status === TableStatus.WAITING"
                    :class="playerStore.table?.status === TableStatus.FINISH || playerStore.table?.status === TableStatus.WAITING ? 'cursor-not-allowed' : ''">
                    <VTooltip distance="22">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="w-6 h-6 focus:outline-none" viewBox="0 0 16 16">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z" />
                        </svg>
                        <template #popper>
                            {{ playerStore.table?.status === TableStatus.PAUSE ? 'Resume Game' : 'Pause Game' }}

                        </template>
                    </VTooltip>
                </button>
            </Flex>
            <!-- Stop -->
            <Flex :justify="'center'" :items="'center'" class="hover:text-primary duration-300 transition"
                @click="$emit('stopGame')"
                :class="playerStore.table?.status === TableStatus.WAITING ? 'cursor-not-allowed' : ''">
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
                :class="playerStore.table?.status === TableStatus.PLAYING || playerStore.table?.status === TableStatus.PAUSE ? '' : 'cursor-not-allowed'"
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

const playerStore = usePlayerStore();
const emits = defineEmits([
    'openSettings',
    'stopGame',
    'leaveGame',
    'newGame',
    'updateTableGameStatus',
    'showAllCards', 
    'setNextPlayer'
]);

</script>

<style scoped></style>