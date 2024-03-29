<template>
    <form class="mt-10 px-4 py-8" v-if="card" @submit.prevent="submitCard">
        <!-- Name field -->
        <label for="name" class="block text-lg font-medium">Name</label>
        <div class="mt-1">
            <input id="name" type="text" v-model="card.name"
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-lg" />
        </div>

        <!-- Private Field -->
        <div class="mt-4 flex">
            <label for="private" class="block text-lg font-medium mr-2">Private</label>
            <input id="private" type="checkbox" v-model="card.private" />
        </div>

        <!-- Image Field -->
        <div class="mt-4 relative">
            <label for="imageFile" class="block text-lg font-medium">Image</label>
            <div class="mt-1">
                <input id="imageFile" type="file" class="rounded-md border border-gray-300" @change="onImageChoose" />
                <!-- Loaded image -->
                <img :src="loadImage(imageScreen)" class="w-52 h-60 mt-4" v-if="imageScreen">
            </div>
        </div>

        <!-- Submit button -->
        <div class="flex justify-center">
            <PrimaryButton title="Submit" type="submit" />
        </div>
    </form>
</template>

<script setup lang="ts">
import type CreateCard from '@/types/cards/CreateCard';
import { ref, watch, onMounted } from 'vue';
import { loadImage } from '@/utils/helpers';
import PrimaryButton from '../buttons/PrimaryButton.vue';

onMounted(() => {
    if (props.cardData) {
        card.value.name = props.cardData.name;
        card.value.private = props.cardData.private;
    }
    if (props.imageFile) {
        imageScreen.value = props.imageFile;
    }
})

const emit = defineEmits(['sendData']);
const props = defineProps(['successResponse', 'cardData', 'imageFile', 'edit']);
const imageScreen = ref();
const card = ref<CreateCard>({
    name: '',
    private: false
})
const image = ref({
    file: '',
    name: ''
});

const onImageChoose = (ev: any) => {
    const file = ev.target.files[0];
    image.value.name = file.name
    image.value.file = file;
    const reader = new FileReader();
    reader.onload = () => {
        imageScreen.value = reader.result
    }
    reader.readAsDataURL(file)
}

const submitCard = () => {
    emit('sendData', card.value, image.value, props.cardData);
}

const resetData = () => {
    card.value.name = '';
    card.value.private = false;
    imageScreen.value = '';
}

watch(() => props.successResponse,
    (newVal) => {
        if (newVal === 1) {
            resetData()
        }
    }
);
</script>