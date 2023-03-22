<template>
    <Flex :gap="4" class="my-2 mx-8">
        <Flex :column="true" :items="'center'" :gap="1">
            <div class="relative card-box" ref="deckReference"
            :class="deck.cards?.length ? '' : 'border'"
            @drop="(event) => $emit('onDrop', event, deck.tableDeckId)" @dragover.prevent @dragleave="(event) => $emit('onDragLeave', event)"
                    @dragenter.prevent="(event) => $emit('onDragEnter', event)">
                    <DraggableCard :card="card" v-for="(card, index) in deck.cards" :key="index"
                        @on-drag-start="(event, cardRef) => $emit('onDragStart', event, cardRef, card)" :hidden-cards="deck.deckType === DeckType.DECK" />
            </div>
            <div class="text-sm">{{ deck.deckName }}</div>
        </Flex>
    </Flex>
</template>

<script setup lang="ts">
import { DeckType } from '@/types/decks/DeckType.enum';
import type { TableCard } from '@/types/tables/TableCard';
import { ref, onMounted, type PropType } from 'vue';
import Flex from '../wrappers/Flex.vue';
import DraggableCard from './DraggableCard.vue';

const deckReference = ref<HTMLElement | null>(null);

interface TableDeckId {
    tableDeckId: number | undefined;
    cards: TableCard[] | undefined;
    index: number,
    deckName: string | undefined, 
    deckType: DeckType | undefined
}

const props = defineProps({
    deck: { type: Object as PropType<TableDeckId>, required: true },
})

const emits = defineEmits(['deckCreate', 'onDrop', 'onDragLeave', 'onDragEnter', 'onDragStart'])

onMounted(() => {
    if (deckReference.value) {
        emits('deckCreate', deckReference.value);
    }
})

</script>