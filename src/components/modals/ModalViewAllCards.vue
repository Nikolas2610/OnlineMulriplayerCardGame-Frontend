<template>
    <Modal :modalOpen="isModalOpen" @closeModal="$emit('closeModal')" v-if="cards || tableDecks" 
    class="z-[2147483645]">
        <template v-slot:modal_header>
            Cards
        </template>

        <template v-slot:body>
            <div v-for="deck in tableDecks" :key="deck.id" class="px-4">
                <div class="border-b border-primary text-black py-2 mb-3">
                    {{ printName(deck) }}
                </div>
                <Flex :gap="2" v-if="getCards(deck.id)?.length > 0">
                    <img class="card-box" :src="loadImage(card.card.image)" v-for="card in getCards(deck.id)"
                        :key="card.id">
                </Flex>
                <Flex :gap="2" v-else>
                    <div>No cards</div>
                </Flex>
            </div>
        </template>

        <template v-slot:modal_footer>
            <button
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-8 py-3 text-base font-medium text-white hover:bg-secondary hover:text-white md:py-3 md:px-10 md:text-lg ml-2"
                @click="$emit('closeModal')">
                Close
            </button>
        </template>

    </Modal>
</template>

<script setup lang="ts">
import Modal from '../Modal.vue';
import type { PropType } from 'vue';
import type { TableDeck } from '@/types/tables/TableDeck';
import type { TableCard } from '@/types/tables/TableCard';
import Flex from '../wrappers/Flex.vue';
import { loadImage } from '@/utils/Function';
import { TableDeckType } from '@/types/tables/TableDeckType';

// TODO: CLean code
const props = defineProps({
    isModalOpen: { type: Boolean, required: true },
    tableDecks: { type: Array as PropType<TableDeck[] | null | undefined>, required: true },
    cards: { type: Array as PropType<TableCard[] | null>, required: true },
});

const printName = (tableDeck: TableDeck) => {
    switch (tableDeck.type) {
        case TableDeckType.USER:
            return tableDeck.user?.username;
        case TableDeckType.DECK:
            return tableDeck.deck?.name;
        case TableDeckType.TABLE:
            return 'Table';
        case TableDeckType.JUNK:
            return 'Junk';
        default:
            break;
    }
}

const getCards = (tableDeckId: number) => {
    return props.cards?.filter(card => card.table_deck.id === tableDeckId) || [];
}

const emits = defineEmits(['closeModal']);

</script>
