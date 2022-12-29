<template>
    <div class="container">
        <div class="mt-4 w-1/6">
            <div class="text-2xl border-b-4 border-primary py-4 px-2">
                Create Card
            </div>
        </div>

        <div class="mt-10 px-4 py-8" v-if="card">
            <div>
                <label for="name" class="block text-lg font-medium">Name</label>
                <div class="mt-1">
                    <input id="name" type="text" v-model="card.name"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-lg" />
                </div>
            </div>

            <div class="mt-4 flex">
                <label for="private" class="block text-lg font-medium mr-2">Private</label>
                <input id="private" type="checkbox" v-model="card.private" class="" />
            </div>

            <div class="mt-4 relative">
                <label for="min_players" class="block text-lg font-medium">Image</label>
                <div class="mt-1">
                    <input id="min_players" type="file" @change="onImageChoose"
                        class="rounded-md border border-gray-300" />
                    <img :src="imageFile" class="w-52 h-80 mt-4" v-if="imageFile">
                </div>
            </div>

            <div class="flex justify-center">
                <button class="mt-4 btn-green">Submit</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type CreateCard from '@/types/cards/CreateCard'

const card = ref<CreateCard>({
    name: '',
    private: false,
    image: ''
})
const imageFile = ref();

// TODO: Do after implement save image to the backend
const onImageChoose = (ev: any) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        imageFile.value = reader.result;
        // modalCard.value?.image = reader.result as string;
    }

    reader.readAsDataURL(file);
}

</script>

<style scoped>

</style>