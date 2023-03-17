<template>
    <label class="block text-sm font-medium" v-if="titleShow">{{ title }}</label>
    <select id="countries" :disabled="disable" v-model="selectValue" @change="$emit('update', selectValue)"
        class="border border-gray-300 file:after:text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
        :class="dark ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50  text-gray-900'">
        <option :value="null">--Empty--</option>
        <option :value="item.id" v-for="(item, index) in options" :key="index">{{ item.name }}</option>
    </select>
    <div v-for="error in errors" :key="error.$uid" class="text-rose-700 text-base font-medium mt-1 px-2">
        {{ error.$message }}
    </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';

export interface SelectOptions {
    id: number | string | null;
    name: string;
}

export interface Input {
    value: number | string | null | undefined
}

const props = defineProps({
    options: { type: Array as PropType<SelectOptions[] | undefined | null>, required: true },
    disable: { type: Boolean, default: false },
    titleShow: { type: Boolean, default: true },
    title: { type: String },
    input: { type: Object as PropType<Input | null>, default: null },
    dark: { type: Boolean, default: false }, 
    errors: { type: Object },
});

const emits = defineEmits(['update'])
const selectValue = ref();
if (props.input) {
    selectValue.value = props.input.value
}
</script>
