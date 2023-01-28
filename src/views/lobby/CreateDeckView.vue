<template>
    <div class="container w-4/6 border rounded-lg shadow-xl lg:mt-4">
        <MyTitle>Create Deck</MyTitle>
        <DeckForm :successResponse="successResponse" @sendData="saveDeck"  />
    </div>
</template>

<script setup lang="ts">
import MyTitle from '@/components/MyTitle.vue';
import DeckForm from '@/components/forms/DeckForm.vue';
import type CreateDeck from '@/types/decks/CreateDeck'
import { ref } from 'vue';
import axiosUser from '@/plugins/axiosUser';
import type { AxiosResponse } from 'axios';
import { useToast } from "vue-toastification";

const toast = useToast();
const successResponse = ref(-1);

const saveDeck = async (deck: CreateDeck) => {
    try {
        const response: AxiosResponse = await axiosUser.post('deck', deck);
        if (response.status === 201) {
            toast.success('Deck save successfully');
            successResponse.value = 1;
            setTimeout(() => {
                successResponse.value = -1;
            },1000)
            return
        }
        toast.error('Something went wrong. Please try again later');
    } catch (error) {
        toast.error('Something went wrong. Please try again later');
    }
}
</script>
