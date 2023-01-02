<template>
    <div class="container">
        <MyTitle>Create Card</MyTitle>

        <CardForm @sendData="saveCard" :successResponse="successResponse" :cardData="undefined"
            :imageFile="undefined" />
    </div>
</template>

<script setup lang="ts">
import MyTitle from '@/components/MyTitle.vue';
import CardForm from '@/components/forms/CardForm.vue';
import { ref } from 'vue';
import type CreateCard from '@/types/cards/CreateCard'
import axiosUser from '@/plugins/axiosUser';
import type { AxiosResponse } from 'axios';
import { useToast } from "vue-toastification";

const toast = useToast();
const successResponse = ref(-1);

const saveCard = async (card: CreateCard, image: any) => {
    const formData = new FormData()
    formData.append('image', image.file, image.name)
    formData.append('name', card.name)
    formData.append('private', card.private.toString())

    try {
        const response: AxiosResponse = await axiosUser.post('card', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (response.status === 201) {
            toast.success('Card save succesfully')
            successResponse.value = 1;
            setTimeout(() => {
                successResponse.value = -1;
            }, 1000)
            return
        }
        toast.error('Something went wrong. Please try again later');
    } catch (error: any) {
        if (error.response.data.message === 'Validation failed (expected type is .(png|jpeg|jpg|svg))') {
            toast.error('Valid types images are png, jpeg, jpg and svg')
        }
    }
}
</script>
