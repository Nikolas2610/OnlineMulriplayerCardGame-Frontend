<template>
    <Flex class="border-l w-72 p-4 h-full bg-dark text-white" :column="true" :gap="2">
        <slot></slot>
    </Flex>
</template>
import 

<script setup lang="ts">
import Flex from '../wrappers/Flex.vue';
import { ref } from 'vue';

const menuItems = ref([
    { id: 0, name: 'Table' },
    { id: 1, name: 'Game' },
    { id: 2, name: 'Players' },
])
const selectedMenuItem = ref(2);
</script>

<style scoped></style>