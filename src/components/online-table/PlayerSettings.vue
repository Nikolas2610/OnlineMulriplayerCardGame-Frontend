<template>
    <div ref="el" :style="style" style="position: fixed;" :class="playerStore.clickCardId ? 'snooze' : ''"
        class="z-[2147483644]">
        <Flex class="bg-dark rounded-2xl px-4 border border-white" :gap="2">
            <div class="py-3 pr-4 border-r cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z" />
                </svg>
            </div>
            <!-- Card Settings -->
            <!-- Show / Hide Card -->
            <div class="py-1">
                <VTooltip>
                    <div class="p-2 rounded-3xl group transition duration-300"
                        @click="playerStore.clickCardId ? playerStore.toggleCardVisibility() : ''"
                        :class="[playerStore.clickCardId ? 'hover:bg-white cursor-pointer' : 'cursor-not-allowed']">
                        <svg v-if="playerStore.isCardHidden()" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" :class="[playerStore.clickCardId ? 'group-hover:text-dark' : 'opacity-50']"
                            class="w-6 h-6 transition duration-300 " viewBox="0 0 16 16">
                            <path
                                d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                            <path
                                d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            :class="[playerStore.clickCardId ? 'group-hover:text-dark' : 'opacity-50']"
                            class="w-6 h-6 transition duration-300 " viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path
                                d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg>
                    </div>
                    <template #popper>
                        {{ playerStore.clickCardId ? 'Show / Hide card' : nullCardMessage }}
                    </template>
                </VTooltip>
            </div>
            <!-- Rotate right card -->
            <div class="py-1">
                <VTooltip>
                    <div class="p-2 rounded-3xl group transition duration-300"
                        :class="[playerStore.clickCardId ? 'hover:bg-white cursor-pointer hover:rotate-90' : 'cursor-not-allowed']"
                        @click="playerStore.clickCardId ? playerStore.rotateCard(MovementRotateCard.RIGHT) : ''">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            :class="[playerStore.clickCardId ? 'group-hover:text-dark' : 'opacity-50']"
                            class="w-6 h-6 transition duration-300 " viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path
                                d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                        </svg>
                    </div>
                    <template #popper>
                        {{ playerStore.clickCardId ? 'Rotate card right 90°' : nullCardMessage }}
                    </template>
                </VTooltip>
            </div>
            <!-- Rotate left Card -->
            <div class="py-1">
                <VTooltip>
                    <div class="p-2 rounded-3xl group transition duration-300"
                        :class="[playerStore.clickCardId ? 'hover:bg-white cursor-pointer hover:-rotate-90' : 'cursor-not-allowed']"
                        @click="playerStore.clickCardId ? playerStore.rotateCard(MovementRotateCard.LEFT) : ''">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            :class="[playerStore.clickCardId ? 'group-hover:text-dark' : 'opacity-50']"
                            class="w-6 h-6 transition duration-300 " viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                            <path
                                d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                        </svg>
                    </div>
                    <template #popper>
                        {{ playerStore.clickCardId ? 'Rotate card left 90°' : nullCardMessage }}
                    </template>
                </VTooltip>
            </div>
            <!-- Player Settings -->
            <!-- Set player playing mode -->
            <div class="py-1">
                <VTooltip>
                    <div @click="gamePlaying ? playerStore.setPlayingPlayer() : ''"
                        class="p-2 rounded-3xl cursor-pointer hover:bg-white group transition duration-300">
                        <svg v-if="!playerStore.getExistPlayerPlayingStatus" xmlns="http://www.w3.org/2000/svg" width="16"
                            height="16" fill="currentColor"
                            :class="[gamePlaying ? 'group-hover:text-dark' : 'opacity-50 cursor-not-allowed']"
                            class="w-6 h-6 transition duration-300" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            :class="[gamePlaying ? 'group-hover:text-dark' : 'opacity-50 cursor-not-allowed']"
                            class="w-6 h-6 transition duration-300" viewBox="0 0 16 16">
                            <path
                                d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path
                                d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                        </svg>
                    </div>
                    <template #popper>
                        Set status "My turn"
                    </template>
                </VTooltip>
            </div>
            <!-- Set status PLayer -->
            <div class="py-1" v-if="playerStore.table?.game?.status?.length !== 0">
                <VMenu placement="top">
                    <div class="p-2 rounded-3xl cursor-pointer hover:bg-white group transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            :class="[gamePlaying ? 'group-hover:text-dark' : 'opacity-50 cursor-not-allowed']"
                            class="w-6 h-6 transition duration-300" viewBox="0 0 16 16">
                            <path
                                d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                        </svg>
                    </div>
                    <template #popper>
                        <div class="cursor-default bg-black py-2 text-white">
                            <div class="border-b p-2">
                                Status player
                            </div>
                            <div class="p-2 mt-2 cursor-pointer hover:bg-white hover:text-black transition duration-300"
                                @click="playerStore.addStatusPlayer(null)">
                                <Flex :justify="'between'" :items="'center'">
                                    <div>
                                        --Empty--
                                    </div>
                                    <div
                                        v-if="playerStore.table?.table_users?.find(user => user.id === playerStore.getExistTableUserId)?.status === null">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="w-6 h-6" viewBox="0 0 16 16">
                                            <path
                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                    </div>
                                </Flex>
                            </div>
                            <div class="p-2 mt-2 cursor-pointer hover:bg-white hover:text-black transition duration-300"
                                v-for="status in playerStore.table?.game?.status" :key="status.id"
                                @click="playerStore.addStatusPlayer(status)">
                                <Flex :justify="'between'" :items="'center'">
                                    <div>
                                        {{ status.name }}
                                    </div>
                                    <div
                                        v-if="playerStore.table?.table_users?.find(user => user.id === playerStore.getExistTableUserId)?.status?.id === status.id">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="w-6 h-6" viewBox="0 0 16 16">
                                            <path
                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                    </div>
                                </Flex>
                            </div>
                        </div>
                    </template>
                </VMenu>
            </div>
            <!-- View Rank -->
            <div class="py-1">
                <VTooltip>
                    <button class="p-2 rounded-3xl cursor-pointer hover:bg-white group transition duration-300 relative"
                        @click="playerStore.rank.isRankModalOpen = true; playerStore.rank.notification = false;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            :class=" [gamePlaying ? 'group-hover:text-dark' : 'opacity-50 cursor-not-allowed'] "
                            class="w-6 h-6 transition duration-300" viewBox="0 0 16 16">
                            <path
                                d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
                        </svg>
                        <div v-if=" playerStore.rank.notification "
                            class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                            !
                        </div>
                    </button>
                    <template #popper>
                        View Rank
                    </template>
                </VTooltip>
            </div>
            <!-- Get cards from deck -->
            <div class="py-1">
                <VMenu placement="top">
                    <button class="p-2 rounded-3xl cursor-pointer hover:bg-white group transition duration-300 relative"
                        @click=" playerStore.rank.isRankModalOpen = true; playerStore.rank.notification = false; ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            :class=" [gamePlaying ? 'group-hover:text-dark' : 'opacity-50 cursor-not-allowed'] "
                            class="w-6 h-6 transition duration-300" viewBox="0 0 16 16">
                            <path
                                d="M8.5 1.75v2.716l.047-.002c.312-.012.742-.016 1.051.046.28.056.543.18.738.288.273.152.456.385.56.642l.132-.012c.312-.024.794-.038 1.158.108.37.148.689.487.88.716.075.09.141.175.195.248h.582a2 2 0 0 1 1.99 2.199l-.272 2.715a3.5 3.5 0 0 1-.444 1.389l-1.395 2.441A1.5 1.5 0 0 1 12.42 16H6.118a1.5 1.5 0 0 1-1.342-.83l-1.215-2.43L1.07 8.589a1.517 1.517 0 0 1 2.373-1.852L5 8.293V1.75a1.75 1.75 0 0 1 3.5 0z" />
                        </svg>
                    </button>
                    <template #popper>
                        <div class="cursor-default bg-black py-2 text-white">
                            <div class="border-b p-2">
                                Get all cards from:
                            </div>
                            <div class="p-2 mt-2 cursor-pointer hover:bg-white hover:text-black transition duration-300"
                                v-for="   deck    in    playerStore.table?.table_decks?.filter(deck => deck.type !== TableDeckType.USER)   "
                                :key=" deck.id "
                                @click=" playerStore.cardsToDeck(deck.id, playerStore.table?.table_decks?.find(deck => deck.id === playerStore.getExistPlayerTableDeckId)) ">
                                <Flex :justify=" 'between' " :items=" 'center' ">
                                    <div>
                                        {{ deck.deck?.name }}
                                    </div>
                                </Flex>
                            </div>
                        </div>
                    </template>
                </VMenu>
            </div>
            <!-- Move Cards to deck -->
            <div class="py-1">
                <VMenu placement="top">
                    <button class="p-2 rounded-3xl cursor-pointer hover:bg-white group transition duration-300 relative"
                        @click=" playerStore.rank.isRankModalOpen = true; playerStore.rank.notification = false; ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            :class=" [gamePlaying ? 'group-hover:text-dark' : 'opacity-50 cursor-not-allowed'] "
                            class="w-6 h-6 transition duration-300" viewBox="0 0 56 56">
                            <path
                                d="M57.832,26.926l-8-12c-0.186-0.278-0.498-0.445-0.832-0.445H9c-0.335,0-0.646,0.167-0.832,0.445l-8,12
        		c-0.205,0.307-0.224,0.701-0.05,1.026C0.292,28.278,0.631,28.481,1,28.481h6v15.038h2V28.481h5v6h2v-6h27v6h2v-6h5v15.038h2V28.481
        		h5c0.369,0,0.708-0.203,0.882-0.528C58.056,27.627,58.037,27.233,57.832,26.926z M2.869,26.481l6.666-10h38.93l6.667,10H2.869z" />
                        </svg>
                    </button>
                    <template #popper>
                        <div class="cursor-default bg-black py-2 text-white">
                            <div class="border-b p-2">
                                Move cards from table to:
                            </div>
                            <div class="p-2 mt-2 cursor-pointer hover:bg-white hover:text-black transition duration-300"
                                v-for="   deck    in    playerStore.table?.table_decks?.filter(deck => deck.type === TableDeckType.JUNK || deck.type === TableDeckType.DECK)   "
                                :key=" deck.id " @click=" playerStore.cardsToDeck(playerStore.getTableDeckId, deck) ">
                                {{ deck.deck?.name }}
                            </div>
                        </div>
                    </template>
                </VMenu>
            </div>
            <!-- Card to player -->
            <div class="py-1" v-if=" playerStore.table?.game?.status ">
                <VMenu placement="top">
                    <button class="p-2 rounded-3xl cursor-pointer hover:bg-white group transition duration-300 relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            :class=" [playerStore.clickCardId ? 'group-hover:text-dark' : 'opacity-50'] "
                            class="w-6 h-6 transition duration-300" viewBox="0 0 16 16">
                            <path
                                d="M11.5 12.5a3.493 3.493 0 0 1-2.684-1.254 19.92 19.92 0 0 0 1.582 2.907c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847a19.919 19.919 0 0 0 1.582-2.907 3.5 3.5 0 1 1-2.538-5.743 3.5 3.5 0 1 1 6.708 0A3.5 3.5 0 1 1 11.5 12.5z" />
                        </svg>
                    </button>
                    <template #popper>
                        <div class="cursor-default bg-black py-2 text-white">
                            <div class="border-b p-2">
                                Give card to player:
                            </div>
                            <div class="p-2 mt-2 cursor-pointer hover:bg-white hover:text-black transition duration-300"
                                v-for="deck in playerStore.table?.table_decks?.filter(deck => deck.type === TableDeckType.USER)   "
                                :key=" deck.id "
                                @click=" playerStore.clickCardId ? playerStore.cardToPlayer(deck.id) : '' ">
                                {{ deck.user?.username }}
                            </div>
                        </div>
                    </template>
                </VMenu>
            </div>
        </Flex>
    </div>
</template>

<script setup lang="ts">
import Flex from '../wrappers/Flex.vue';
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'
import { usePlayerStore } from '@/stores/PlayerStore';
import { MovementRotateCard } from '@/types/online-table/RotateCard.enum';
import { TableDeckType } from '@/types/tables/TableDeckType';

const playerStore = usePlayerStore();
const el = ref<HTMLElement | null>(null);
const gamePlaying = ref(true);
const nullCardMessage = ref('Please click a card first');

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
    initialValue: { x: window.innerWidth * 0.5 - 300, y: window.innerHeight - 250 },
})

</script>

<style>
.v-popper--theme-dropdown .v-popper__inner {
    border: 1px solid black;
    box-shadow: none;
    border-radius: 6px;
    background: black !important;
    color: white;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    33% {
        transform: translateY(-15px);
    }

    66% {
        transform: translateY(10px);
    }
}

.snooze {
    animation-name: bounce;
    animation-duration: 0.8s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
}
</style>

