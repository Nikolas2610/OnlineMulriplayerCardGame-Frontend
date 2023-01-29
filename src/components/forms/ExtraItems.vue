<template>
    <div class="flex justify-between items-center p-2" :class="label ? 'bg-gray-100 border-t border-x border-primary rounded-t' : ''">
        <CheckBoxField :title="title" :input="label" 
        @change="(value: boolean) => label = value" />
        <button type="button" class="btn-add mt-1" v-if="label" @click="$emit('addItem')">+</button>
    </div>
</template>

<script setup lang="ts">
import CheckBoxField from '../ui/CheckBoxField.vue';
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    input: { type: Boolean, required: true },
    errors: { type: Object },
    title: { type: String, required: true },
});
const label = ref<boolean>(false);
onMounted(() => {
    label.value = props.input;
})
const emits = defineEmits(['update', 'addItem']);
watch(() => label.value,
    (newVal) => {
        emits('update', newVal);
    }
);
</script>