<template>
    <Modal :modalOpen="isModalOpen" @closeModal="$emit('closeModal')" v-if="cards || tableDecks" class="z-[2147483645]">
        <template v-slot:modal_header>
            Cards
        </template>

        <template v-slot:body>
            <div class=" max-h-[500px] overflow-y-auto">
                <div v-for="deck in tableDecks" :key="deck.id" class="px-4">
                    <div class="border-b border-primary text-black py-2 mb-3">
                        {{ printName(deck) }}
                    </div>
                    <Flex :gap="2" :wrap="true" v-if="getCards(deck.id)?.length > 0">
                        <img class="card-box" :src="loadImage(card.card.image)" v-for="card in getCards(deck.id)"
                            :key="card.id">
                    </Flex>
                    <Flex :gap="2" v-else>
                        <div>No cards</div>
                    </Flex>
                </div>
            </div>
        </template>

        <template v-slot:modal_footer>
            <ModalSecondaryButton @click="$emit('closeModal')">
                Close
            </ModalSecondaryButton>
        </template>

    </Modal>
</template>

<script setup lang="ts">
import Modal from '../Modal.vue';
import type { PropType } from 'vue';
import type { TableDeck } from '@/types/tables/TableDeck';
import type { TableCard } from '@/types/tables/TableCard';
import Flex from '../wrappers/Flex.vue';
import { loadImage } from '@/utils/helpers';
import { TableDeckType } from '@/types/tables/TableDeckType';
import ModalSecondaryButton from '../buttons/ModalSecondaryButton.vue';

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