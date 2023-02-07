<template>
    <ol
        class="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center rounded-lg shadow-sm text-gray-400 sm:text-base bg-dark border-dark sm:p-4 sm:space-x-4">

        <StepFormItem v-for="item in items" :key="item.index" :index="item.index" :title="item.title"
            :active="activeItem === item.index" :last-item="item.index === items.length" />
    </ol>
    <slot></slot>
    <Flex :justify="'between'" :gap="8" class="mt-10">
        <PrimaryButton :title="'Previous'" :disable="activeItem === 1"
            @click="activeItem > 1 ? $emit('decrease', activeItem - 1) : ''" />
        <PrimaryButton :title="'Next'" :disable="activeItem === items.length"
            @click="activeItem !== items.length ? $emit('increase', activeItem + 1) : ''" />
    </Flex>
</template>

<script setup lang="ts">
import PrimaryButton from '../buttons/PrimaryButton.vue';
import Flex from './Flex.vue';
import { ref } from 'vue';
import StepFormItem from './StepFormItem.vue';
const props = defineProps({
    activeItem: { type: Number, require: true, default: 1 }
});
const emits = defineEmits(['increase', 'decrease'])
const items = ref([
    { index: 1, title: 'Create Game' },
    { index: 2, title: 'Add Teams' },
    { index: 3, title: 'Add Status' },
    { index: 4, title: 'Add Roles' },
    { index: 5, title: 'Starting Cards' },
]);
</script>
