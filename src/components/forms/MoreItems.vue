<template>
    <div class="col-span-2 p-2" v-if="label" :class="label ? 'border border-primary rounded-b' : ''">
        <div class="" v-for="(team, index) in items" :key="index">
            <div class="flex items-center w-full gap-4">
                <InputField :title="itemsTitle" :input="team.name" @change="(value) => $emit('update', value, index)" />
                <button class="btn-delete mt-3" type="button" @click="$emit('deleteItem', index)">-</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputField from '@/components/ui/InputField.vue';
import { ref, onMounted, watch } from 'vue';
const props = defineProps({
    input: { type: Boolean, required: true },
    errors: { type: Object },
    items: { type: Object, required: true },
    itemsTitle: { type: String, required: true },
});
const emits = defineEmits(['deleteItem', 'update']);
const label = ref<boolean>(false);

onMounted(() => {
    label.value = props.input;
})

watch(() => props.input,
    (newVal) => {
        label.value = newVal;
    }
);
</script>

<style scoped>

</style>