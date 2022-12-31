<template>
    <form class="mt-10 px-4 py-8" v-if="card" @submit.prevent="submitCard">
        <div>
            <label for="name" class="block text-lg font-medium">Name</label>
            <div class="mt-1">
                <input id="name" type="text" v-model="card.name"
                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-lg" />
            </div>
        </div>

        <div class="mt-4 flex">
            <label for="private" class="block text-lg font-medium mr-2">Private</label>
            <input id="private" type="checkbox" v-model="card.private" />
        </div>

        <div class="mt-4 relative">
            <label for="min_players" class="block text-lg font-medium">Image</label>
            <div class="mt-1">
                <input id="min_players" type="file" class="rounded-md border border-gray-300" @change="onImageChoose" />
                <img :src="imageScreen" class="w-52 h-80 mt-4" v-if="imageScreen">
            </div>
        </div>

        <div class="flex justify-center">
            <button class="mt-4 btn-green" type="submit">Submit</button>
            <button class="mt-4 ml-2 btn-grey" type="button" v-if="edit"  @click="$emit('closeEditMode')">Back</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import type CreateCard from '@/types/cards/CreateCard';
import { ref, watch, onMounted } from 'vue';

onMounted(() => {
    if (props.cardData) {
        console.log(props.cardData);
        card.value.name = props.cardData.name;
        card.value.private = props.cardData.private;
    }
    if (props.imageFile) {
        imageScreen.value = props.imageFile;
    }
})

const emit = defineEmits(['sendData', 'closeEditMode']);
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
    card.value.name = ''
    card.value.private = false
    imageScreen.value = ''
}

watch(() => props.successResponse,
    (newVal) => {
        if (newVal === 1) {
            resetData()
        }
    }
);
</script>

<style scoped>

</style>