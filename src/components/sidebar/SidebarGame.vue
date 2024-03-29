<template>
    <Flex class="border-l w-72 p-4 h-full bg-dark text-white" :column="true" :gap="2">
        <Flex :column="true" :justify="'between'" class="h-[96%]">
            <div>
                <div class="text-2xl border-b border-primary pb-2">Users</div>
                <GameUserItem v-for="(user, index) in playerStore.table?.table_users?.sort((a,b) => a.turn - b.turn)" :key="index"
                    class="mt-3 w-2xl bg-primary" :playing="user.playing">
                    <Flex :items="'center'" :justify="playerStore.cards ? 'center' : 'between'" :gap="2">
                        <div class="w-3/6">{{ user.user?.username }}</div>
                        <Flex :gap="2" class="w-2/6" v-if="playerStore.cards">
                            <img src="@/assets/icons/sidebar/cards.svg" alt="cards" srcset="">
                            <div>{{ playerStore.getCards(playerStore.getTableDeckIdOfUser(user.user.id))?.length }}</div>
                        </Flex>
                        <div class="w-1/6 cursor-pointer group" @click="toggleOpenUserCard(user.id)"
                            v-if="(user.team?.name || user.role?.name || user.status?.name) || playerStore.cards">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="group-hover:text-primary duration-300 transition"
                                :class="isOpenUserCard(user.id) ? 'rotate-0' : 'rotate-180'" viewBox="0 0 16 16">
                                <path
                                    d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                            </svg>
                        </div>
                    </Flex>
                    <div class="italic font-bold"
                        :class="playerStore.table.game_master.id === user.user?.id && user.playing ? 'text-dark' : 'text-primary'"
                        v-if="playerStore.table?.game_master?.id === user.user?.id">Game Master</div>
                    <div class="p-2 mt-2 shadow-2xl rounded-xl border-dashed border" v-if="isOpenUserCard(user.id) &&
                        (user.team?.name || user.role?.name || user.status?.name)">
                        <Flex v-if="user.team?.name">
                            <div class="w-2/6">Team:</div>
                            <div>{{ user.team?.name ? user.team?.name : 'none' }}</div>
                        </Flex>
                        <Flex v-if="user.role?.name">
                            <div class="w-2/6">Role:</div>
                            <div>{{ user.role?.name ? user.role?.name : 'none' }}</div>
                        </Flex>
                        <Flex v-if="user.status?.name">
                            <div class="w-2/6">Status:</div>
                            <div>{{ user.status?.name ? user.status?.name : 'none' }}</div>
                        </Flex>
                    </div>
                    <div v-if="playerStore.cards && isOpenUserCard(user.id)" class="mt-4">
                        <Flex :gap="2" class="flex-wrap" :justify="'start'">
                            <img :src="card.hidden ? backCardImage : loadImage(card.card.image)" alt="" srcset=""
                                v-for="(card, index) in playerStore.getCards(playerStore.getTableDeckIdOfUser(user.user.id))"
                                :key="`user-card-${index}`" class="w-10 h-12 hover:scale-150 transition duration-500">
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
    </Flex>
</template>
import 

<script setup lang="ts">
import { usePlayerStore } from '@/stores/PlayerStore';
import Flex from '../wrappers/Flex.vue';
import GameUserItem from '@/components/sidebar/GameUserItem.vue';
import BackButton from '@/components/buttons/BackButton.vue';
import backCardImage from '@/assets/images/close-card.png'
import { loadImage } from '@/utils/helpers';
import { ref, watch } from 'vue';
import { TableStatus } from '@/types/tables/TableStatus.enum';


const playerStore = usePlayerStore();
const openUserCards = ref<number[]>([]);

const isOpenUserCard = (id: number) => {
    return openUserCards.value.indexOf(id) !== -1;
}

const toggleOpenUserCard = (id: number) => {
    openUserCards.value.indexOf(id) !== -1
        ? openUserCards.value = openUserCards.value.filter(userId => userId !== id)
        : openUserCards.value.push(id);
}

watch(() => playerStore.table,
    () => {
        if (playerStore.table?.status !== TableStatus.WAITING) {
            openUserCards.value = [];
            playerStore.table?.table_users?.forEach(user => {
                openUserCards.value.push(user.id);
            })
        }
    })
</script>