<template>
    <div class="container">
        <div class="mt-4 w-1/6">
            <div class="text-2xl border-b-4 border-primary py-4 px-2">
                Create Deck
            </div>
        </div>

        <div class="mt-10 px-4 py-8" v-if="deck">
            <div>
                <label for="name" class="block text-lg font-medium">Name</label>
                <div class="mt-1">
                    <input id="name" type="text" v-model="deck.name"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-lg" />
                </div>
            </div>

            <div class="mt-4 flex">
                <label for="private" class="block text-lg font-medium mr-2">Private</label>
                <input id="private" type="checkbox" v-model="deck.private" class="" />
            </div>

            <div class="flex justify-center">
                <button class="mt-4 btn-outline-green" @click="openModal">Add Card</button>
                <button class="mt-4 ml-2 btn-green">Submit</button>
            </div>
            <!-- TODO: Fix this images src error -->
            <h1 class="mt-4 text-lg font-medium">Card List:</h1>
            <div class="mt-4 grid grid-cols-8 gap-2 px-4 py-8 border rounded-lg shadow-lg">
                <div class="col-span-1 flex justify-center items-center flex-col gap-2" v-for="num in selectedCards"
                    :key="num" v-if="cards">
                    <img :src="cards[num].image" class="w-32 max-h-52">
                    <div>{{ cards[num].name }}</div>
                </div>
            </div>
        </div>
    </div>

    <Modal :modalOpen="isModalOpen" @closeModal="deactiveteModal">
        <template v-slot:modal_header>
            Add Cards
        </template>
        <template v-slot:body>
            <div>
                <label for="role" class="block text-sm font-medium">Role</label>
                <select id="role" v-model="cardsPublic"
                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm">
                    <option value="user">User</option>
                    <option value="public">Public</option>
                </select>
            </div>
            <div class="grid grid-cols-4 mt-4 gap-2 max-h-96 overflow-y-scroll" v-if="cards">
                <div class="col-span-1 flex justify-center items-center flex-col cursor-pointer hover:bg-primary rounded-lg p-2"
                    @click="addSelectedCards(card.id)" :class="isSelectedCard(card.id) ? 'bg-primary' : ''"
                    v-for="card in cards" :key="card.id">
                    <img :src="card.image" class="w-32 max-h-52">
                    <div class="pt-2">{{ card.name }}</div>
                </div>
            </div>
        </template>
        <template v-slot:modal_footer>
            <button @click="addCardsToDeck"
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-primary text-white px-8 py-3 text-base font-medium hover:bg-secondary hover:text-white md:py-3 md:px-10 md:text-lg">
                Add Cards
            </button>
            <button
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-8 py-3 text-base font-medium text-white hover:bg-secondary hover:text-white md:py-3 md:px-10 md:text-lg ml-2"
                @click="deactiveteModal">
                Close
            </button>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import type CreateDeck from '@/types/decks/CreateDeck'
import Modal from '@/components/Modal.vue';
import { ref, watch } from 'vue';
import type Card from '@/types/cards/Card';
import axiosUser from '@/plugins/axiosUser';

const count = ref(1);
const cardsPublic = ref('user');
const isModalOpen = ref<Boolean>(false);
const cards = ref<Card[]>();
const selectedCards = ref<number[]>([]);

const deck = ref<CreateDeck>({
    name: '',
    private: false
})

// Close view details modal
const deactiveteModal = () => {
    selectedCards.value = [];
    isModalOpen.value = false;
}

const openModal = async () => {
    await getCards();
    isModalOpen.value = true;
}

const getCards = async () => {
    try {
        const response = await axiosUser.get(`card/${cardsPublic.value}`);
        cards.value = response.data;
        console.log(cards.value);
    } catch (error) {
        console.log(error);
    }
}

const isSelectedCard = (id: number) => {
    return selectedCards.value.includes(id);
}

const addSelectedCards = (id: number) => {
    if (selectedCards.value.includes(id)) {
        // Remove the value from the array if it exists
        selectedCards.value = selectedCards.value.filter((number) => number !== id);
    } else {
        // Add the value to the array if it does not exist
        selectedCards.value.push(id);
    }
}

const addCardsToDeck = () => {
    console.log(selectedCards.value);
    isModalOpen.value = false;
}

watch(() => cardsPublic.value,
    (newVal) => {
        getCards();
    });




</script>

<style scoped>

</style>