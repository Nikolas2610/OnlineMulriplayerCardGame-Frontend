<template>
    <form class="mt-10 px-4 py-8" v-if="deck" @submit.prevent="saveDeck">
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

        <Flex justify="center" :gap="4">
            <SecondaryButton title="Edit cards deck" @click="openModal" />
            <PrimaryButton title="Submit" type="submit" />
        </Flex>
        <h1 class="mt-4 text-lg font-medium">Card List:</h1>
        <div class="mt-4 grid grid-cols-8 gap-2 px-4 py-8 border rounded-lg shadow-lg">
            <div class="col-span-1 flex justify-center items-center flex-col gap-2" v-for="card in deck.cards"
                :key="`sel-${card.id}`">
                <img :src="loadImage(card.image)" class="w-32 max-h-52">
                <div>{{ card.name }}</div>
            </div>
        </div>


    </form>

    <Modal :modalOpen="isModalOpen" @closeModal="deactivateModal">
        <template v-slot:modal_header>
            Add or Remove Cards
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
                <div class="col-span-1 flex justify-center items-center flex-col cursor-pointer hover:bg-secondary hover:text-white rounded-lg p-2  transition duration-300"
                    @click="addSelectedCards(card)" :class="isSelectedCard(card.id) ? 'bg-primary' : ''"
                    v-for="card in cards" :key="card.id">
                    <img :src="loadImage(card.image)" class="w-32 max-h-52">
                    <div class="pt-2" :class="isSelectedCard(card.id) ? 'text-white' : ''">{{ card.name }}</div>
                </div>
            </div>
        </template>
        <template v-slot:modal_footer>
            <ModalSecondaryButton @click="deactivateModal">
                Close
            </ModalSecondaryButton>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import type CreateDeck from '@/types/decks/CreateDeck'
import Modal from '@/components/Modal.vue';
import { ref, watch, onBeforeMount } from 'vue';
import type Card from '@/types/cards/Card';
import axiosUser from '@/plugins/axiosUser';
import type { AxiosResponse } from 'axios';
import { loadImage } from '@/utils/helpers';
import { useToast } from 'vue-toastification';
import PrimaryButton from '../buttons/PrimaryButton.vue';
import SecondaryButton from '../buttons/SecondaryButton.vue';
import Flex from '../wrappers/Flex.vue';
import ModalSecondaryButton from '@/components/buttons/ModalSecondaryButton.vue';

const cardsPublic = ref('user');
const isModalOpen = ref<Boolean>(false);
const cards = ref<Card[]>();
const selectedCards = ref<number[]>([]);
const emit = defineEmits(['sendData']);
const props = defineProps(['successResponse', 'deckData', 'edit']);
const toast = useToast();

const deck = ref<CreateDeck>({
    name: '',
    private: false,
    cards: []
})

onBeforeMount(() => {
    if (props.deckData) {
        deck.value = { ...props.deckData };
        deck.value.cards = [...props.deckData.cards];
        if (deck.value) {
            deck.value.cards.forEach(card => {
                selectedCards.value.push(card.id);
            })
        }
    }
})

// Close view details modal
const deactivateModal = () => {
    isModalOpen.value = false;
}

const openModal = async () => {
    await getCards();
    isModalOpen.value = true;
}

const getCards = async () => {
    try {
        const response: AxiosResponse = await axiosUser.get(`card/${cardsPublic.value}`);
        cards.value = response.data;
        if (cards.value?.length === 0) {
            toast.warning('First you have to create card before choose cards for the deck')
        }
    } catch (error) {
        console.log(error);
    }
}

const isSelectedCard = (id: number) => {
    return selectedCards.value.includes(id);
}

const addSelectedCards = (card: Card) => {
    const index = deck.value.cards.findIndex(c => c.id === card.id);
    if (index >= 0) {
        // Remove the object from the array if it exists
        selectedCards.value = selectedCards.value.filter((number) => number !== card.id);
        deck.value.cards.splice(index, 1);
    } else {
        // Add the object to the array if it does not exist
        selectedCards.value.push(card.id);
        deck.value.cards.push(card);
    }
}

const saveDeck = () => {
    emit('sendData', deck.value);
}

const resetDeck = () => {
    deck.value.name = '';
    deck.value.private = false;
    deck.value.cards = [];
    selectedCards.value = [];
}

watch(() => cardsPublic.value,
    (newVal) => {
        getCards();
    }
);

watch(() => props.successResponse,
    (newVal) => {
        if (newVal === 1) {
            resetDeck()
        }
    }
);
</script>

<style scoped>

</style>