<template>
    <div class="mt-20">
        Room {{ route.params.id }}
    </div>
    <GameMasterMenu v-if="playerStore.gameMaster" @close="modalOpen = true" />
    <div class="mt-10 underline">Users</div>
    <div v-for="(user, index) in usersOnline" :key="user.id">{{ user.username }}</div>
    <ModalFullPage :modal-open="modalOpen" @close-modal="modalOpen = false" />
</template>

<script setup lang="ts">
import socket from '@/plugins/socket';
import router from '@/router';
import { usePlayerStore } from '@/stores/PlayerStore';
import type { TableUsers } from '@/types/lobby/TableUsers';
import { onUnmounted, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import GameMasterMenu from '@/components/GameMasterMenu.vue';
import ModalFullPage from '@/components/modals/ModalFullPage.vue';

interface PlayerUser {
    username: string | null,
    id: number,
}

const route = useRoute();
const playerStore = usePlayerStore();
const usersOnline = ref<PlayerUser[]>([]);
const modalOpen = ref(false)

playerStore.room = route.params.id.toString();
if (playerStore.table) {
    playerStore._joinTable(playerStore.room);
} else {
    router.push({ name: 'lobby' })
}

onBeforeMount(() => {
    playerStore.setGameMaster();

    socket.on('getTableUsers', (table_users: TableUsers[], room: string) => {
        if (room === playerStore.room) {
            usersOnline.value = table_users.map(({ user: { username, id } }) => ({ username, id }));
        }
    })
})
onUnmounted(() => {
    playerStore.room = null;
    playerStore._leaveTable();
})

</script>
