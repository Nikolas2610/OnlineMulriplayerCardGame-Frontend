<template>
    <div>
        <div class="mt-1 flex">
            <!-- Checkbox Label -->
            <label class="block text-sm font-medium mr-2" v-if="titleShow">{{ title }}</label>
            <input type="checkbox" v-model="label" @input="$emit('change', !label)" />
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
    input: { type: Boolean, required: true },
    errors: { type: Object },
    title: { type: String },
    titleShow: { type: Boolean, default: true }
});
const emits = defineEmits(['change']);
const label = ref<boolean>();
onMounted(() => {
    label.value = props.input;
})
</script>