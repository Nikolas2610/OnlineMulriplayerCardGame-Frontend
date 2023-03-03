<template>
    <div class="mb-3 w-full">
        <!-- Input Label -->
        <label class="block text-sm font-medium" v-if="titleShow">{{ title }}</label>
        <div class="mt-1">
            <input :type="type" v-model="label" @input="$emit('change', label)" :max="max" :min="min" :disabled="disabled" :placeholder="placeholder"
                class="text-black block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm"
                :class="disabled ? 'cursor-not-allowed' : ''" />
        </div>
        <!-- Password error messages -->
        <div v-for="error in errors" :key="error.$uid" class="text-rose-700 text-base font-medium mt-1 px-2">
            {{ error.$message }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
const props = defineProps({
    input: { type: [String, Number, Boolean, Object, Array], required: true },
    errors: { type: Object },
    title: { type: String },
    type: { type: String, default: 'text' },
    max: { type: Number, default: null },
    min: { type: Number, default: null },
    titleShow: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String }
});
const emits = defineEmits(['change']);
const label = ref<any>('');
onMounted(() => {
    label.value = props.input;
})
watch(() => props.input,
    (newVal) => {
        label.value = newVal;
    }
);
</script>