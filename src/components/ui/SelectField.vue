<template>
    <label class="block text-sm font-medium" v-if="titleShow">{{ title }}</label>
    <select id="countries" :disabled="disable" v-model="selectValue" @change="$emit('update', selectValue)"
        class="border border-gray-300 file:after:text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
        :class="dark ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50  text-gray-900'">
        <option :value="item.id" v-for="(item, index) in options" :key="index">{{ item.name }}</option>
    </select>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    options: { type: Array<{ id: number | string, name: string }>, required: true },
    disable: { type: Boolean, default: false },
    titleShow: { type: Boolean, default: true },
    title: { type: String },
    input: { type: Object, default: null },
    dark: { type: Boolean, default: false }
});
const emits = defineEmits(['update'])
const selectValue = ref();
if (props.input) {
    selectValue.value = props.input.value
}
</script>
