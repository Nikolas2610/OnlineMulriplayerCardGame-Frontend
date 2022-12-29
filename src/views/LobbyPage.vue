<template>
    <section class="bg-dark" style="height: calc(100vh - 3.8rem)">
        <div class="container">
            <button id="dropdownDefault" data-dropdown-toggle="dropdown" class="btn-green flex items-center"
                type="button" @mouseover="dropmenuOpen = true" @mouseleave="dropmenuOpen = false">
                Create
                <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <!-- Dropdown menu -->
            <div id="dropdown" v-bind:class="{ 'block': dropmenuOpen, 'hidden': !dropmenuOpen }"
                @mouseover="dropmenuOpen = true" @mouseleave="dropmenuOpen = false"
                class="absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow">
                <ul class="py-1 text-sm text-gray-700" aria-labelledby="dropdownDefault">
                    <li v-for="({ name, router }, index) in dropmenuItems" :key="index">
                        <RouterLink :to="{ name: router }" class="block py-2 px-4 hover:bg-gray-100">
                            {{ name }}
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { RouterLink } from 'vue-router';

const dropmenuOpen = ref(false);
const dropmenuItems = ref([
    { router: 'create-table', name: 'Create Table' },
    { router: 'create-game', name: 'Create Game' },
    { router: 'create-deck', name: 'Create Deck' },
])
</script>

<style lang="scss" scoped>

</style>