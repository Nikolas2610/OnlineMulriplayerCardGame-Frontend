<template>
    <div class="mb-3">
        <!-- Input Label -->
        <label class="block text-sm font-medium">{{ title }}</label>
        <div class="mt-1">
            <textarea v-model="label" rows="4" @input="$emit('change', label)"
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm"></textarea>
        </div>
        <!-- Password error messages -->
        <div v-for="error in errors" :key="error.$uid" class="text-rose-700 text-base font-medium mt-1 px-2">
            {{ error.$message }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const props = defineProps({
    input: { type: String, required: true },
    errors: { type: Object },
    title: { type: String, required: true },
});
const emits = defineEmits(['change']);
const label = ref<string>('');
onMounted(() => {
    label.value = props.input;
})
</script>

<style scoped>

</style>