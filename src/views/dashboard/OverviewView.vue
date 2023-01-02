<template>
    <div class="container w-full overflow-x-auto px-2">
        <!-- Title -->
        <MyTitle>Dashboard</MyTitle>

        <div class="grid lg:grid-cols-2 grid-cols-1 gap-8 mt-10 mx-20">
            <div class="col-span-1 border bg-primary rounded-xl px-4 py-8 text-center">
                <div class="text-white text-xl">Tables create</div>
                <div class="text-white text-7xl">{{ data.tables }}</div>
            </div>
            <div class="col-span-1 border bg-indigo-500 rounded-xl px-4 py-8 text-center">
                <div class="text-white text-xl">Games create</div>
                <div class="text-white text-7xl">{{ data.games }}</div>
            </div>
            <div class="col-span-1 border bg-blue-500 rounded-xl px-4 py-8 text-center">
                <div class="text-white text-xl">Decks create</div>
                <div class="text-white text-7xl">{{ data.decks }}</div>
            </div>
            <div class="col-span-1 border bg-orange-500 rounded-xl px-4 py-8 text-center">
                <div class="text-white text-xl">Cards create</div>
                <div class="text-white text-7xl">{{ data.cards }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MyTitle from '@/components/MyTitle.vue';
import axiosUser from '@/plugins/axiosUser';
import type { AxiosResponse } from 'axios';
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useRoute } from 'vue-router';

const route = useRoute()
const userStore = useUserStore();
const role = ref<string | null>('user');
const data = ref<{ tables: number, cards: number, games: number, decks: number }>({
    tables: 0,
    cards: 0,
    games: 0,
    decks: 0,
})

onMounted(async () => {
    // Admin Router APIs calls
    if (route.meta.admin) {
        role.value = userStore.$state.user.role;    // user or admin
    }
    getData();
})

const getData = async () => {
    try {
        const response: AxiosResponse = await axiosUser.get(`${role.value}/dashboard`);
        data.value = response.data;
    } catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>

</style>