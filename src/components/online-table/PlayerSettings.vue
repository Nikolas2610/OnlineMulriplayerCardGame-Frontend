<template>
    <div ref="el" :style="style" style="position: fixed;" :class="playerStore.clickCardId ? 'snooze' : ''"
        class="z-[2147483644]">
        <Flex class="bg-dark rounded-2xl px-4 border border-white" :gap="4">
            <div class="py-3 pr-4 border-r cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z" />
                </svg>
            </div>
            <!-- Card Settings -->
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
            <div class="py-1" v-if="playerStore.table?.game?.status">
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
                                        v-if="playerStore.table.table_users?.find(user => user.id === playerStore.getExistTableUserId)?.status === null">
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
                                        v-if="playerStore.table.table_users?.find(user => user.id === playerStore.getExistTableUserId)?.status?.id === status.id">
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
        </Flex>
    </div>
</template>

<script setup lang="ts">
import Flex from '../wrappers/Flex.vue';
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'
import { usePlayerStore } from '@/stores/PlayerStore';
import { MovementRotateCard } from '@/types/online-table/RotateCard.enum';

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

