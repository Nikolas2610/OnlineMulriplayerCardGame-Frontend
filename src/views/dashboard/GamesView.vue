<template>
    <div class="conteiner w-full overflow-auto px-2">
        <div class="w-1/6">
            <div class="text-2xl border-b-4 border-primary py-4 px-2">
                My Games
            </div>
        </div>

        <!-- Table -->
        <div class="mx-auto mt-4">
            <div class="flex flex-col">
                <div class="overflow-x-auto shadow-md sm:rounded-lg">
                    <div class="inline-block min-w-full align-middle">
                        <div class="overflow-hidden ">
                            <table class="min-w-full divide-y table-fixed divide-gray-700">
                                <thead class="bg-gray-700">
                                    <tr>
                                        <th scope="col" v-for="(title, index) in tablesFields" :key="index"
                                            class="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-gray-400">
                                            {{ title }}
                                        </th>
                                        <th scope="col" class="p-4">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y bg-gray-800 divide-gray-700">
                                    <tr class="hover:bg-gray-700" v-for="(game) in games" :key="`gamme_${game.id}`">
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ game.id }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ game.name }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ game.min_players }} - {{ game.max_players }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ game.grid_rows }} X {{ game.grid_cols }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                            {{ game.private ? 'YES' : 'NO' }}
                                        </td>
                                        <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                            <a href="#" class="text-indigo-600 hover:underline">View Details</a>
                                            <a href="#" class="text-blue-500 hover:underline ml-2">Edit</a>
                                            <a href="#" class="text-red-500 hover:underline ml-2">Delete</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axiosUser from '@/plugins/axiosUser';
import type { AxiosResponse } from 'axios';
import { onMounted, ref } from 'vue';
import type Game from '@/types/games/Game'

const games = ref<Game[]>([]);
const tablesFields = ref([
    'ID', 'NAME', 'PLAYERS', 'GRID', 'PRIVATE'
]);

onMounted(async () => {
    try {
        const response: AxiosResponse = await axiosUser.get('user/games');
        games.value = response.data;
    } catch (error) {
        console.log(error);

    }
})
</script>

<style scoped>

</style>